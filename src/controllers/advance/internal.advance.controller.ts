import { Request, Response, NextFunction } from "express";
import { prisma } from "../../db/database";
import { sendSuccess, sendError } from "../../utils/responseWrapper";
import { EnumAdvancesStatus, EnumEmployerTier } from "../../generated/prisma";
import { Decimal } from "@prisma/client/runtime/library";

interface PayrollPaymentBody {
  employerId: string;
  payrollData: {
    employeeId: string;
    salary: string;
    paymentDate: string;
  }[];
  totalAmount: string;
  transactionHash?: string;
}

interface RiskAdjustmentTrigger {
  type: "EMPLOYER_DEFAULT_RATE" | "POOL_UTILIZATION" | "MONTHLY_DEFAULTS";
  employerId?: string;
  metric?: string;
  value?: number;
}

export const internalAdvanceController = {
  /**
   * Process payroll payment and auto-deduct advances
   * Endpoint: POST /api/v1/internal/payroll/process-payment
   * This endpoint is called when an employer pays salaries through the platform
   */
  async processPayrollPayment(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {
        employerId,
        payrollData,
        totalAmount,
        transactionHash,
      }: PayrollPaymentBody = req.body;

      if (!employerId || !payrollData || !payrollData.length) {
        sendError(res, null, "Invalid payroll data", 400);
        return;
      }

      // Verify employer exists
      const employer = await prisma.employer.findUnique({
        where: { id: employerId },
      });

      if (!employer) {
        sendError(res, null, "Employer not found", 404);
        return;
      }

      const processedPayments = [];
      const repaymentResults = [];

      // Process each employee's payment
      for (const payment of payrollData) {
        const { employeeId, salary, paymentDate } = payment;

        // Get employee's outstanding advances
        const outstandingAdvances = await prisma.advance.findMany({
          where: {
            employeeId,
            employerId,
            status: {
              in: [EnumAdvancesStatus.DISBURSED, EnumAdvancesStatus.PAID],
            },
          },
          orderBy: { requestDate: "asc" }, // FIFO for repayment
        });

        let totalDeduction = new Decimal(0);
        const repaidAdvances = [];

        // Calculate total deductions
        for (const advance of outstandingAdvances) {
          const repaymentAmount = advance.repaymentAmount;
          totalDeduction = totalDeduction.add(repaymentAmount);
          repaidAdvances.push({
            advanceId: advance.id,
            amount: advance.amount.toString(),
            repaymentAmount: repaymentAmount.toString(),
          });
        }

        // Calculate net salary after deductions
        const grossSalary = new Decimal(salary);
        const netSalary = grossSalary.minus(totalDeduction);

        // Update advance statuses to REPAID
        for (const advance of outstandingAdvances) {
          await prisma.advance.update({
            where: { id: advance.id },
            data: {
              status: EnumAdvancesStatus.REPAID,
              paymentDate: new Date(paymentDate),
              repaymentTransactionHash: transactionHash,
            },
          });
        }

        // Update employee's advance balance and statistics
        const employee = await prisma.employee.findUnique({
          where: { id: employeeId },
        });

        if (employee) {
          await prisma.employee.update({
            where: { id: employeeId },
            data: {
              currentAdvanceBalance: new Decimal(0), // Reset balance after repayment
              totalAdvancesRepaid:
                employee.totalAdvancesRepaid + repaidAdvances.length,
              creditScore: Math.min(
                850,
                (employee.creditScore || 500) + repaidAdvances.length * 10,
              ), // Improve credit score
            },
          });
        }

        processedPayments.push({
          employeeId,
          grossSalary: grossSalary.toString(),
          totalDeduction: totalDeduction.toString(),
          netSalary: netSalary.toString(),
          repaidAdvances,
        });

        // TODO: Initiate bank transfer for net salary to employee
        // This would integrate with banking API to transfer netSalary to employee's bank account

        repaymentResults.push({
          employeeId,
          success: true,
          repaidCount: repaidAdvances.length,
          totalRepaid: totalDeduction.toString(),
        });
      }

      // Update employer statistics
      const totalRepaidCount = repaymentResults.reduce(
        (sum, r) => sum + r.repaidCount,
        0,
      );
      await prisma.employer.update({
        where: { id: employerId },
        data: {
          totalAdvancesProcessed:
            employer.totalAdvancesProcessed + totalRepaidCount,
        },
      });

      const response = {
        employerId,
        processedPayments,
        summary: {
          totalEmployees: payrollData.length,
          totalAmount,
          totalAdvancesRepaid: totalRepaidCount,
          transactionHash,
        },
      };

      sendSuccess(
        res,
        response,
        "Payroll processed and advances repaid successfully",
        200,
      );
    } catch (error) {
      console.error("Error processing payroll payment:", error);
      sendError(res, error, "Failed to process payroll payment", 500);
      next(error);
    }
  },

  /**
   * Dynamic risk adjustment system
   * Endpoint: POST /api/v1/internal/risk/adjustments
   * This endpoint is triggered periodically or by specific events
   */
  async processRiskAdjustments(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { type, employerId, metric, value }: RiskAdjustmentTrigger =
        req.body;

      const adjustments = [];

      switch (type) {
        case "EMPLOYER_DEFAULT_RATE": {
          if (!employerId) {
            sendError(
              res,
              null,
              "Employer ID required for default rate adjustment",
              400,
            );
            return;
          }

          const employer = await prisma.employer.findUnique({
            where: { id: employerId },
          });

          if (!employer) {
            sendError(res, null, "Employer not found", 404);
            return;
          }

          // Calculate default rate
          const [totalAdvances, defaultedAdvances] = await Promise.all([
            prisma.advance.count({
              where: { employerId },
            }),
            prisma.advance.count({
              where: {
                employerId,
                status: EnumAdvancesStatus.DEFAULTED,
              },
            }),
          ]);

          // Calculate the default rate as a percentage. If there are no total advances, the default rate is 0.
          const defaultRate =
            totalAdvances > 0 ? (defaultedAdvances / totalAdvances) * 100 : 0;

          // If default rate exceeds threshold, adjust limits
          if (defaultRate > 5) {
            // 5% threshold
            const previousLimit = employer.advancePercentageLimit;
            const newLimit = Math.max(5, previousLimit - 5); // Reduce by 5%, minimum 5%

            await prisma.employer.update({
              where: { id: employerId },
              data: {
                advancePercentageLimit: newLimit,
                autoApproveAdvances: false, // Require manual approval
                defaultRate: new Decimal(defaultRate),
              },
            });

            // Log the adjustment
            await prisma.riskAdjustment.create({
              data: {
                employerId,
                adjustmentType: "ADVANCE_LIMIT_REDUCTION",
                previousValue: new Decimal(previousLimit),
                newValue: new Decimal(newLimit),
                reason: `Default rate exceeded threshold: ${defaultRate.toFixed(2)}%`,
                triggerMetric: "DEFAULT_RATE",
                triggerValue: new Decimal(defaultRate),
                adjustmentDate: new Date(),
              },
            });

            adjustments.push({
              type: "ADVANCE_LIMIT_REDUCTION",
              employerId,
              previousLimit,
              newLimit,
              reason: `Default rate: ${defaultRate.toFixed(2)}%`,
            });

            // Downgrade tier if necessary
            if (defaultRate > 10 && employer.tier !== EnumEmployerTier.NEW) {
              await prisma.employer.update({
                where: { id: employerId },
                data: { tier: EnumEmployerTier.NEW },
              });

              adjustments.push({
                type: "TIER_DOWNGRADE",
                employerId,
                previousTier: employer.tier,
                newTier: EnumEmployerTier.NEW,
                reason: `High default rate: ${defaultRate.toFixed(2)}%`,
              });
            }
          }
          break;
        }

        case "POOL_UTILIZATION": {
          // Monitor overall pool utilization
          const poolStats = await prisma.liquidityPool.aggregate({
            _sum: { amount: true },
          });

          const outstandingAdvances = await prisma.advance.aggregate({
            where: {
              status: {
                in: [EnumAdvancesStatus.DISBURSED, EnumAdvancesStatus.PAID],
              },
            },
            _sum: { amount: true },
          });

          const totalPool = poolStats._sum.amount || new Decimal(0);
          const totalOutstanding =
            outstandingAdvances._sum.amount || new Decimal(0);

          if (totalPool.gt(0)) {
            // Calculate the pool utilization percentage.
            // Calculate how much of the available money in the pool is currently being used for advances.
            // This is expressed as a percentage: (Total Outstanding Advances / Total Liquidity Pool Amount) * 100
            const utilization = new Decimal(totalOutstanding.toString())
              .div(new Decimal(totalPool.toString()))
              .mul(100)
              .toNumber();

            if (utilization > 85) {
              // High utilization - reduce limits temporarily
              const employers = await prisma.employer.findMany({
                where: { isVerified: true },
              });

              for (const emp of employers) {
                const previousLimit = emp.advancePercentageLimit;
                const newLimit = Math.max(5, Math.floor(previousLimit * 0.8)); // Reduce by 20%

                await prisma.employer.update({
                  where: { id: emp.id },
                  data: { advancePercentageLimit: newLimit },
                });

                await prisma.riskAdjustment.create({
                  data: {
                    employerId: emp.id,
                    adjustmentType: "POOL_UTILIZATION_LIMIT",
                    previousValue: new Decimal(previousLimit),
                    newValue: new Decimal(newLimit),
                    reason: `High pool utilization: ${utilization.toFixed(2)}%`,
                    triggerMetric: "POOL_UTILIZATION",
                    triggerValue: new Decimal(utilization),
                    adjustmentDate: new Date(),
                  },
                });

                adjustments.push({
                  type: "POOL_UTILIZATION_LIMIT",
                  employerId: emp.id,
                  previousLimit,
                  newLimit,
                  utilization: utilization.toFixed(2),
                });
              }

              // TODO: Increase LP rewards to attract more liquidity
              // This would interact with smart contracts to adjust reward rates
            }
          }
          break;
        }

        case "MONTHLY_DEFAULTS": {
          // Check monthly default volume
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

          const [monthlyDefaults, monthlyTotal] = await Promise.all([
            prisma.advance.aggregate({
              where: {
                status: EnumAdvancesStatus.DEFAULTED,
                updatedAt: { gte: thirtyDaysAgo },
              },
              _sum: { amount: true },
            }),
            prisma.advance.aggregate({
              where: {
                requestDate: { gte: thirtyDaysAgo },
              },
              _sum: { amount: true },
            }),
          ]);

          const defaultAmount = monthlyDefaults._sum.amount || new Decimal(0);
          const totalAmount = monthlyTotal._sum.amount || new Decimal(0);

          if (totalAmount.gt(0)) {
            const defaultPercentage = defaultAmount
              .div(totalAmount)
              .mul(100)
              .toNumber();

            if (defaultPercentage > 2) {
              // 2% monthly default threshold
              // Deploy reserve fund for LP protection
              const reserveFundDeployment = defaultAmount.mul(0.5); // Cover 50% of defaults

              await prisma.reserveFund.create({
                data: {
                  amount: reserveFundDeployment,
                  transactionType: "LP_PROTECTION",
                  description: `Reserve fund deployment for monthly defaults: ${defaultPercentage.toFixed(2)}%`,
                  timestamp: new Date(),
                },
              });

              adjustments.push({
                type: "RESERVE_FUND_DEPLOYMENT",
                amount: reserveFundDeployment.toString(),
                defaultPercentage: defaultPercentage.toFixed(2),
                reason: "Monthly default threshold exceeded",
              });

              // Pause advances from high-risk employers
              const highRiskEmployers = await prisma.employer.findMany({
                where: {
                  defaultRate: { gte: 5 },
                },
              });

              for (const emp of highRiskEmployers) {
                await prisma.employer.update({
                  where: { id: emp.id },
                  data: {
                    advancePercentageLimit: 0, // Temporarily pause advances
                    autoApproveAdvances: false,
                  },
                });

                adjustments.push({
                  type: "HIGH_RISK_PAUSE",
                  employerId: emp.id,
                  companyName: emp.companyName,
                  defaultRate: emp.defaultRate.toString(),
                });
              }
            }
          }
          break;
        }
      }

      const response = {
        type,
        adjustments,
        timestamp: new Date(),
        message: `Risk adjustments processed: ${adjustments.length} adjustments made`,
      };

      sendSuccess(
        res,
        response,
        "Risk adjustments processed successfully",
        200,
      );
    } catch (error) {
      console.error("Error processing risk adjustments:", error);
      sendError(res, error, "Failed to process risk adjustments", 500);
      next(error);
    }
  },

  /**
   * Process tier upgrades for employers based on historical performance
   * Endpoint: POST /api/v1/internal/risk/tier-upgrade
   */
  async processTierUpgrades(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const upgrades = [];

      // Get employers eligible for tier upgrade (3+ months on platform)
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      const eligibleEmployers = await prisma.employer.findMany({
        where: {
          createdAt: { lte: threeMonthsAgo },
          isVerified: true,
        },
        include: {
          employees: {
            include: {
              advances: true,
            },
          },
        },
      });

      for (const employer of eligibleEmployers) {
        // Calculate performance metrics
        const totalAdvances = await prisma.advance.count({
          where: { employerId: employer.id },
        });

        const repaidAdvances = await prisma.advance.count({
          where: {
            employerId: employer.id,
            status: EnumAdvancesStatus.REPAID,
          },
        });

        const defaultedAdvances = await prisma.advance.count({
          where: {
            employerId: employer.id,
            status: EnumAdvancesStatus.DEFAULTED,
          },
        });

        const repaymentRate =
          totalAdvances > 0 ? (repaidAdvances / totalAdvances) * 100 : 0;
        // Calculate the default rate as a percentage.
        // An advance with a "DEFAULTED" status indicates that the borrower failed to repay the amount by the due date.
        // A "REPAID" status, in contrast, means the borrower successfully fulfilled their repayment obligation.
        // A "DISBURSED" status means the advance has been issued to the employee but hasn't reached its due date or been repaid yet.
        // The default rate is the percentage of advances for this employer that have been marked as DEFAULTED.
        // It's important for risk assessment as it indicates the employer's reliability in ensuring repayments.
        const defaultRate =
          totalAdvances > 0 ? (defaultedAdvances / totalAdvances) * 100 : 0;

        // Determine tier upgrade eligibility
        let newTier = employer.tier;
        let upgraded = false;

        if (employer.tier === EnumEmployerTier.NEW) {
          // Upgrade to API_VERIFIED if bank history is verified and good performance
          if (
            employer.bankHistoryVerified &&
            repaymentRate > 95 &&
            defaultRate < 2
          ) {
            newTier = EnumEmployerTier.API_VERIFIED;
            upgraded = true;
          }
        } else if (employer.tier === EnumEmployerTier.API_VERIFIED) {
          // Upgrade to PLATFORM_TRUSTED after 6+ months with excellent performance
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

          if (
            employer.createdAt <= sixMonthsAgo &&
            repaymentRate > 98 &&
            defaultRate < 1 &&
            totalAdvances >= 50
          ) {
            newTier = EnumEmployerTier.PLATFORM_TRUSTED;
            upgraded = true;
          }
        }

        if (upgraded) {
          // Update employer tier
          const newLimit =
            newTier === EnumEmployerTier.PLATFORM_TRUSTED
              ? 50
              : newTier === EnumEmployerTier.API_VERIFIED
                ? 30
                : 10;

          await prisma.employer.update({
            where: { id: employer.id },
            data: {
              tier: newTier,
              advancePercentageLimit: newLimit,
              autoApproveAdvances: newTier !== EnumEmployerTier.NEW,
            },
          });

          // Log the tier upgrade
          await prisma.riskAdjustment.create({
            data: {
              employerId: employer.id,
              adjustmentType: "TIER_UPGRADE",
              previousValue: new Decimal(
                employer.tier === EnumEmployerTier.NEW ? 1 : 2,
              ),
              newValue: new Decimal(
                newTier === EnumEmployerTier.PLATFORM_TRUSTED ? 3 : 2,
              ),
              reason: `Performance metrics: Repayment ${repaymentRate.toFixed(2)}%, Default ${defaultRate.toFixed(2)}%`,
              triggerMetric: "PERFORMANCE_REVIEW",
              triggerValue: new Decimal(repaymentRate),
              adjustmentDate: new Date(),
            },
          });

          upgrades.push({
            employerId: employer.id,
            companyName: employer.companyName,
            previousTier: employer.tier,
            newTier,
            newLimit,
            metrics: {
              repaymentRate: repaymentRate.toFixed(2),
              defaultRate: defaultRate.toFixed(2),
              totalAdvances,
            },
          });
        }
      }

      const response = {
        processedEmployers: eligibleEmployers.length,
        upgrades,
        timestamp: new Date(),
      };

      sendSuccess(res, response, "Tier upgrades processed successfully", 200);
    } catch (error) {
      console.error("Error processing tier upgrades:", error);
      sendError(res, error, "Failed to process tier upgrades", 500);
      next(error);
    }
  },

  /**
   * Process defaulted advances (advances past due date)
   * Endpoint: POST /api/v1/internal/advances/process-defaults
   */
  async processDefaultedAdvances(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const today = new Date();

      // Find advances past due date that haven't been repaid
      const overdueAdvances = await prisma.advance.findMany({
        where: {
          dueDate: { lt: today },
          status: {
            in: [EnumAdvancesStatus.DISBURSED, EnumAdvancesStatus.PAID],
          },
        },
        include: {
          employee: true,
        },
      });

      const defaultedAdvances = [];

      for (const advance of overdueAdvances) {
        // Mark as defaulted
        await prisma.advance.update({
          where: { id: advance.id },
          data: { status: EnumAdvancesStatus.DEFAULTED },
        });

        // Update employee credit score
        const employee = advance.employee;
        const newCreditScore = Math.max(
          300,
          (employee.creditScore || 500) - 50,
        ); // Reduce by 50 points

        await prisma.employee.update({
          where: { id: employee.id },
          data: { creditScore: newCreditScore },
        });

        defaultedAdvances.push({
          advanceId: advance.id,
          employeeId: advance.employeeId,
          amount: advance.amount.toString(),
          dueDate: advance.dueDate,
          daysPastDue: Math.floor(
            (today.getTime() - advance.dueDate.getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        });
      }

      // Update employer default rates
      const employerIds = [
        ...new Set(overdueAdvances.map((a) => a.employerId)),
      ];

      for (const employerId of employerIds) {
        const [totalAdvances, defaultedCount] = await Promise.all([
          prisma.advance.count({ where: { employerId } }),
          prisma.advance.count({
            where: {
              employerId,
              status: EnumAdvancesStatus.DEFAULTED,
            },
          }),
        ]);

        const defaultRate =
          totalAdvances > 0 ? (defaultedCount / totalAdvances) * 100 : 0;

        await prisma.employer.update({
          where: { id: employerId },
          data: { defaultRate: new Decimal(defaultRate) },
        });
      }

      const response = {
        processedCount: overdueAdvances.length,
        defaultedAdvances,
        affectedEmployers: employerIds.length,
        timestamp: new Date(),
      };

      sendSuccess(
        res,
        response,
        "Defaulted advances processed successfully",
        200,
      );
    } catch (error) {
      console.error("Error processing defaulted advances:", error);
      sendError(res, error, "Failed to process defaulted advances", 500);
      next(error);
    }
  },
};
