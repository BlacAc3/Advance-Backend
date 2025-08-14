import { Request, Response, NextFunction } from "express";
import { prisma } from "../../db/database";
import { TokenPayload } from "../../types";
import { sendSuccess, sendError } from "../../utils/responseWrapper";
import { EnumAdvancesStatus, EnumEmployerTier } from "../../generated/prisma";
import { Decimal } from "@prisma/client/runtime/library";

interface AdvanceStatusResponse {
  monthlySalary: string;
  daysWorked: number;
  earnedToDate: string;
  availableAdvance: string;
  availableAdvancePercentage: number;
  employerTier: string;
  currentAdvanceBalance: string;
  eligibleForDailyAdvance: boolean;
  serviceFeePercentage: number;
  nextSalaryDate: Date;
}

interface AdvanceRequestBody {
  advanceAmount: number;
}

export const employeeAdvanceController = {
  /**
   * Get advance status for an employee
   * Endpoint: GET /api/v1/employee/advance/status
   */
  async getAdvanceStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;

      if (!userId) {
        sendError(res, null, "Unauthorized: User ID not found", 401);
        return;
      }

      // Get employee with employer information
      const employee = await prisma.employee.findUnique({
        where: { userId },
        include: {
          employer: true,
          advances: {
            where: {
              status: {
                in: [
                  EnumAdvancesStatus.PENDING,
                  EnumAdvancesStatus.APPROVED,
                  EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL,
                  EnumAdvancesStatus.DISBURSED,
                  EnumAdvancesStatus.PAID,
                ],
              },
            },
          },
        },
      });

      if (!employee) {
        sendError(res, null, "Employee record not found", 404);
        return;
      }

      if (!employee.salary) {
        sendError(res, null, "Salary information not available", 400);
        return;
      }

      // Calculate days worked
      const today = new Date();
      const startDate = employee.startDate || employee.registrationDate;
      const daysWorked = Math.floor(
        (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      // Update days worked in database
      await prisma.employee.update({
        where: { id: employee.id },
        data: { daysWorked },
      });

      // Calculate earned to date (assuming 30-day month)
      const monthlySalary = new Decimal(employee.salary.toString());
      const dailySalary = monthlySalary.div(30);
      const currentMonthDay = new Date().getDate();
      const earnedToDate = dailySalary.mul(currentMonthDay);

      // Determine available advance based on employer tier
      const employer = employee.employer;
      let availableAdvancePercentage = 10; // Default for NEW tier
      let serviceFeePercentage = 3; // Default service fee

      switch (employer.tier) {
        case EnumEmployerTier.NEW:
          availableAdvancePercentage = employer.advancePercentageLimit || 10;
          serviceFeePercentage = 3;
          break;
        case EnumEmployerTier.API_VERIFIED:
          availableAdvancePercentage = employer.advancePercentageLimit || 30;
          serviceFeePercentage = 3;
          break;
        case EnumEmployerTier.PLATFORM_TRUSTED:
          availableAdvancePercentage = employer.advancePercentageLimit || 50;
          serviceFeePercentage = 3;
          break;
      }

      // Calculate available advance. This calculation determines the maximum amount of advance an employee can request.
      // It starts with the employee's earned income to date within the current month (earnedToDate).
      // The available advance percentage (availableAdvancePercentage) which is determined by the employer's tier (NEW, API_VERIFIED, PLATFORM_TRUSTED)
      //  is then applied to this earned amount.  The employer sets the advancePercentageLimit.
      // Finally, any existing outstanding advance balance (currentAdvanceBalance) is subtracted.  This balance represents money already advanced to the employee
      // that has not yet been repaid.
      // The aim is to provide employees with early access to a portion of their earned salary, while mitigating risk by limiting the advance to a percentage of their earnings
      // and accounting for any existing debts.

      const availableAdvance = earnedToDate
        .mul(availableAdvancePercentage)
        .div(100)
        .minus(employee.currentAdvanceBalance || 0);
      // Check eligibility for daily advance (after 15 days of work)
      const eligibleForDailyAdvance = daysWorked >= 15 && employer.isVerified;

      // Calculate next salary date (assuming end of month)
      const nextSalaryDate = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
      );

      const response: AdvanceStatusResponse = {
        monthlySalary: monthlySalary.toString(),
        daysWorked,
        earnedToDate: earnedToDate.toString(),
        availableAdvance: availableAdvance.toString(),
        availableAdvancePercentage,
        employerTier: employer.tier,
        currentAdvanceBalance:
          employee.currentAdvanceBalance?.toString() || "0",
        eligibleForDailyAdvance,
        serviceFeePercentage,
        nextSalaryDate,
      };

      sendSuccess(res, response, "Advance status retrieved successfully", 200);
    } catch (error) {
      console.error("Error getting advance status:", error);
      sendError(res, error, "Failed to retrieve advance status", 500);
      next(error);
    }
  },

  /**
   * Request an advance
   * Endpoint: POST /api/v1/employee/advance/request
   */
  async requestAdvance(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;
      const { advanceAmount }: AdvanceRequestBody = req.body;

      if (!userId) {
        sendError(res, null, "Unauthorized: User ID not found", 401);
        return;
      }

      if (!advanceAmount || advanceAmount <= 0) {
        sendError(res, null, "Invalid advance amount", 400);
        return;
      }

      // Get employee with employer information
      const employee = await prisma.employee.findUnique({
        where: { userId },
        include: {
          employer: true,
          advances: {
            where: {
              status: {
                in: [
                  EnumAdvancesStatus.PENDING,
                  EnumAdvancesStatus.APPROVED,
                  EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL,
                  EnumAdvancesStatus.DISBURSED,
                ],
              },
            },
          },
        },
      });

      if (!employee) {
        sendError(res, null, "Employee record not found", 404);
        return;
      }

      if (!employee.salary) {
        sendError(res, null, "Salary information not available", 400);
        return;
      }

      // Check if employee has completed KYC
      if (!employee.termsAccepted) {
        sendError(
          res,
          null,
          "Please complete KYC and accept terms before requesting an advance",
          400,
        );
        return;
      }

      // Calculate days worked
      const today = new Date();
      const startDate = employee.startDate || employee.registrationDate;
      const daysWorked = Math.floor(
        (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      // Check if eligible for daily advance (15 days minimum)
      if (daysWorked < 15) {
        sendError(
          res,
          null,
          `You need to work for at least 15 days to be eligible for advances. Current days worked: ${daysWorked}`,
          400,
        );
        return;
      }

      // Calculate earned to date
      const monthlySalary = new Decimal(employee.salary.toString());
      const dailySalary = monthlySalary.div(30);
      const currentMonthDay = new Date().getDate();
      const earnedToDate = dailySalary.mul(currentMonthDay);

      // Determine available advance based on employer tier
      const employer = employee.employer;
      let availableAdvancePercentage = 10;
      let requiresEmployerApproval = true;
      let serviceFeePercentage = 3;

      switch (employer.tier) {
        case EnumEmployerTier.NEW:
          availableAdvancePercentage = employer.advancePercentageLimit || 10;
          requiresEmployerApproval = !employer.autoApproveAdvances;
          serviceFeePercentage = 3;
          break;
        case EnumEmployerTier.API_VERIFIED:
          availableAdvancePercentage = employer.advancePercentageLimit || 30;
          requiresEmployerApproval = false; // Auto-approve for API verified
          serviceFeePercentage = 3;
          break;
        case EnumEmployerTier.PLATFORM_TRUSTED:
          availableAdvancePercentage = employer.advancePercentageLimit || 50;
          requiresEmployerApproval = false; // Auto-approve for platform trusted
          serviceFeePercentage = 3;
          break;
      }

      // Calculate maximum available advance
      // This calculation determines the maximum advance amount an employee can request.
      // It starts with the employee's earned income to date within the current month (earnedToDate).
      // Then, it multiplies this earned amount by the available advance percentage (availableAdvancePercentage),
      // which is determined by the employer's tier and any employer-specific limits.
      // Finally, it subtracts any existing outstanding advance balance (employee.currentAdvanceBalance).
      // This ensures that the employee can only request an advance up to the allowed percentage of their earnings,
      // taking into account any already disbursed but unpaid advances.
      const maxAvailableAdvance = earnedToDate
        .mul(availableAdvancePercentage)
        .div(100)
        .minus(employee.currentAdvanceBalance || 0);

      // Validate requested amount
      const requestedAmount = new Decimal(advanceAmount);
      if (requestedAmount.gt(maxAvailableAdvance)) {
        sendError(
          res,
          null,
          `Requested amount exceeds available advance. Maximum available: ${maxAvailableAdvance.toString()}`,
          400,
        );
        return;
      }

      // Check for increased fee for amounts exceeding daily limit
      const dailyLimit = earnedToDate.div(currentMonthDay);
      if (requestedAmount.gt(dailyLimit)) {
        // Increase service fee for amounts exceeding daily limit
        serviceFeePercentage = Math.min(
          6,
          3 + requestedAmount.div(monthlySalary).mul(100).toNumber() * 0.1,
        );
      }

      // Calculate service fee and net amount
      const serviceFee = requestedAmount.mul(serviceFeePercentage).div(100);
      const netAmount = requestedAmount.minus(serviceFee);
      const repaymentAmount = requestedAmount;

      // Calculate repayment date (next salary date)
      const repaymentDate = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
      );

      // Check liquidity pool availability
      const poolStats = await prisma.liquidityPool.aggregate({
        where: { employerId: employer.id },
        _sum: { amount: true },
      });

      const totalPoolAmount = poolStats._sum.amount || new Decimal(0);

      // Get total outstanding advances
      const outstandingAdvances = await prisma.advance.aggregate({
        where: {
          employerId: employer.id,
          status: {
            in: [EnumAdvancesStatus.DISBURSED, EnumAdvancesStatus.PAID],
          },
        },
        _sum: { amount: true },
      });

      const totalOutstanding =
        outstandingAdvances._sum.amount || new Decimal(0);
      const availableLiquidity = new Decimal(totalPoolAmount.toString()).minus(
        new Decimal(totalOutstanding.toString()),
      );

      if (requestedAmount.gt(availableLiquidity)) {
        sendError(
          res,
          null,
          "Insufficient liquidity in the pool. Please try again later or request a smaller amount.",
          400,
        );
        return;
      }

      // Calculate pool utilization
      const poolUtilization = totalPoolAmount.gt(0)
        ? new Decimal(totalOutstanding.toString())
            .add(requestedAmount)
            .div(new Decimal(totalPoolAmount.toString()))
            .mul(100)
        : new Decimal(0);

      // Calculate risk score based on employee credit score and employer tier
      // Credit scores range from 300 to 850
      const baseRiskScore = employee.creditScore || 500;
      const tierMultiplier =
        employer.tier === EnumEmployerTier.PLATFORM_TRUSTED
          ? 1.2
          : employer.tier === EnumEmployerTier.API_VERIFIED
            ? 1.1
            : 1.0;
      const riskScore = Math.round(baseRiskScore * tierMultiplier);

      // Determine initial status
      const initialStatus = requiresEmployerApproval
        ? EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL
        : EnumAdvancesStatus.APPROVED;

      // Create advance request
      let advance = await prisma.advance.create({
        data: {
          employeeId: employee.id,
          employerId: employer.id,
          amount: requestedAmount,
          serviceFee,
          serviceFeePercentage: new Decimal(serviceFeePercentage),
          netAmount,
          repaymentAmount,
          earnedToDate,
          availableAdvance: maxAvailableAdvance,
          requestDate: new Date(),
          dueDate: repaymentDate,
          repaymentDate,
          status: initialStatus,
          poolUtilizationAtRequest: poolUtilization,
          riskScore,
          approvalDate: !requiresEmployerApproval ? new Date() : null,
        },
      });

      // Update employee's current advance balance
      await prisma.employee.update({
        where: { id: employee.id },
        data: {
          currentAdvanceBalance: new Decimal(
            employee.currentAdvanceBalance || 0,
          ).add(requestedAmount),
          totalAdvancesTaken: employee.totalAdvancesTaken + 1,
        },
      });

      // If auto-approved, initiate disbursement process
      if (!requiresEmployerApproval) {
        // TODO: Integrate with smart contract for fund reservation
        // TODO: Initiate off-ramp process for bank transfer

        // Update advance status to disbursed (simulating instant approval)
        advance = await prisma.advance.update({
          where: { id: advance.id },
          data: {
            status: EnumAdvancesStatus.DISBURSED,
            disbursementDate: new Date(),
          },
        });
      }

      const response = {
        advanceId: advance.id,
        advanceAmount: requestedAmount.toString(),
        serviceFee: serviceFee.toString(),
        serviceFeePercentage,
        netAmount: netAmount.toString(),
        repaymentAmount: repaymentAmount.toString(),
        repaymentDate,
        status: advance.status,
        requiresEmployerApproval,
        message: requiresEmployerApproval
          ? "Advance request submitted and pending employer approval"
          : "Advance request approved and funds will be disbursed within 2-5 minutes",
      };

      sendSuccess(
        res,
        response,
        requiresEmployerApproval
          ? "Advance request submitted successfully"
          : "Advance request approved successfully",
        201,
      );
    } catch (error) {
      console.error("Error requesting advance:", error);
      sendError(res, error, "Failed to process advance request", 500);
      next(error);
    }
  },

  /**
   * Get advance history for an employee
   * Endpoint: GET /api/v1/employee/advance/history
   */
  async getAdvanceHistory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;
      const { status, limit = 10, offset = 0 } = req.query;

      if (!userId) {
        sendError(res, null, "Unauthorized: User ID not found", 401);
        return;
      }

      const employee = await prisma.employee.findUnique({
        where: { userId },
      });

      if (!employee) {
        sendError(res, null, "Employee record not found", 404);
        return;
      }

      const whereClause: any = { employeeId: employee.id };
      if (status) {
        whereClause.status = status as EnumAdvancesStatus;
      }

      const advances = await prisma.advance.findMany({
        where: whereClause,
        orderBy: { requestDate: "desc" },
        take: Number(limit),
        skip: Number(offset),
      });

      const total = await prisma.advance.count({
        where: whereClause,
      });

      const response = {
        advances: advances.map((advance) => ({
          id: advance.id,
          amount: advance.amount.toString(),
          serviceFee: advance.serviceFee.toString(),
          netAmount: advance.netAmount.toString(),
          repaymentAmount: advance.repaymentAmount.toString(),
          requestDate: advance.requestDate,
          approvalDate: advance.approvalDate,
          disbursementDate: advance.disbursementDate,
          repaymentDate: advance.repaymentDate,
          dueDate: advance.dueDate,
          status: advance.status,
        })),
        total,
        limit: Number(limit),
        offset: Number(offset),
      };

      sendSuccess(res, response, "Advance history retrieved successfully", 200);
    } catch (error) {
      console.error("Error getting advance history:", error);
      sendError(res, error, "Failed to retrieve advance history", 500);
      next(error);
    }
  },

  /**
   * Cancel a pending advance request
   * Endpoint: DELETE /api/v1/employee/advance/:advanceId/cancel
   */
  async cancelAdvanceRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;
      const { advanceId } = req.params;

      if (!userId) {
        sendError(res, null, "Unauthorized: User ID not found", 401);
        return;
      }

      const employee = await prisma.employee.findUnique({
        where: { userId },
      });

      if (!employee) {
        sendError(res, null, "Employee record not found", 404);
        return;
      }

      const advance = await prisma.advance.findUnique({
        where: { id: advanceId },
      });

      if (!advance) {
        sendError(res, null, "Advance request not found", 404);
        return;
      }

      if (advance.employeeId !== employee.id) {
        sendError(
          res,
          null,
          "Unauthorized to cancel this advance request",
          403,
        );
        return;
      }

      if (
        advance.status !== EnumAdvancesStatus.PENDING &&
        advance.status !== EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL
      ) {
        sendError(res, null, "Can only cancel pending advance requests", 400);
        return;
      }

      // Update advance status to rejected
      await prisma.advance.update({
        where: { id: advanceId },
        data: {
          status: EnumAdvancesStatus.REJECTED,
          rejectionReason: "Cancelled by employee",
        },
      });

      // Update employee's current advance balance
      await prisma.employee.update({
        where: { id: employee.id },
        data: {
          currentAdvanceBalance: new Decimal(
            employee.currentAdvanceBalance || 0,
          ).minus(advance.amount),
        },
      });

      sendSuccess(res, null, "Advance request cancelled successfully", 200);
    } catch (error) {
      console.error("Error cancelling advance request:", error);
      sendError(res, error, "Failed to cancel advance request", 500);
      next(error);
    }
  },
};
