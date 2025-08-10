import { Request, Response, NextFunction } from "express";
import { prisma } from "../../db/database";
import { TokenPayload } from "../../types";
import { sendSuccess, sendError } from "../../utils/responseWrapper";
import { EnumAdvancesStatus } from "../../generated/prisma";
import { Decimal } from "@prisma/client/runtime/library";

interface ApprovalBody {
  approvalNotes?: string;
}

interface RejectionBody {
  rejectionReason: string;
}

export const employerAdvanceController = {
  /**
   * Get pending advance requests for employer's employees
   * Endpoint: GET /api/v1/employer/advances/pending
   */
  async getPendingAdvances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;

      if (!userId) {
        sendError(res, null, "Unauthorized: User ID not found", 401);
        return;
      }

      // Get employer
      const employer = await prisma.employer.findUnique({
        where: { userId },
      });

      if (!employer) {
        sendError(res, null, "Employer record not found", 404);
        return;
      }

      // Get pending advances for this employer
      const pendingAdvances = await prisma.advance.findMany({
        where: {
          employerId: employer.id,
          status: EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL,
        },
        include: {
          employee: {
            include: {
              user: {
                select: {
                  email: true,
                  username: true,
                },
              },
            },
          },
        },
        orderBy: { requestDate: "desc" },
      });

      const response = pendingAdvances.map((advance) => ({
        id: advance.id,
        employeeId: advance.employeeId,
        employeeName: advance.employee.user.username || advance.employee.user.email,
        employeeEmail: advance.employee.user.email,
        amount: advance.amount.toString(),
        serviceFee: advance.serviceFee.toString(),
        netAmount: advance.netAmount.toString(),
        repaymentAmount: advance.repaymentAmount.toString(),
        earnedToDate: advance.earnedToDate.toString(),
        availableAdvance: advance.availableAdvance.toString(),
        requestDate: advance.requestDate,
        dueDate: advance.dueDate,
        status: advance.status,
        riskScore: advance.riskScore,
        creditScore: advance.employee.creditScore,
        daysWorked: advance.employee.daysWorked,
        totalAdvancesTaken: advance.employee.totalAdvancesTaken,
        totalAdvancesRepaid: advance.employee.totalAdvancesRepaid,
      }));

      sendSuccess(res, response, "Pending advances retrieved successfully", 200);
    } catch (error) {
      console.error("Error getting pending advances:", error);
      sendError(res, error, "Failed to retrieve pending advances", 500);
      next(error);
    }
  },

  /**
   * Approve an advance request
   * Endpoint: POST /api/v1/employer/advance/:requestId/approve
   */
  async approveAdvance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;
      const { requestId } = req.params;
      const { approvalNotes }: ApprovalBody = req.body;

      if (!userId) {
        sendError(res, null, "Unauthorized: User ID not found", 401);
        return;
      }

      // Get employer
      const employer = await prisma.employer.findUnique({
        where: { userId },
      });

      if (!employer) {
        sendError(res, null, "Employer record not found", 404);
        return;
      }

      // Get advance request
      const advance = await prisma.advance.findUnique({
        where: { id: requestId },
        include: {
          employee: true,
        },
      });

      if (!advance) {
        sendError(res, null, "Advance request not found", 404);
        return;
      }

      if (advance.employerId !== employer.id) {
        sendError(res, null, "Unauthorized to approve this advance request", 403);
        return;
      }

      if (advance.status !== EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL) {
        sendError(res, null, "This advance request is not pending approval", 400);
        return;
      }

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

      const totalOutstanding = outstandingAdvances._sum.amount || new Decimal(0);
      const availableLiquidity = new Decimal(totalPoolAmount.toString()).minus(
        new Decimal(totalOutstanding.toString())
      );

      if (advance.amount.gt(availableLiquidity)) {
        sendError(
          res,
          null,
          "Insufficient liquidity in the pool to approve this advance",
          400
        );
        return;
      }

      // Update advance status to approved
      const updatedAdvance = await prisma.advance.update({
        where: { id: requestId },
        data: {
          status: EnumAdvancesStatus.APPROVED,
          approvalDate: new Date(),
          approvedBy: userId,
        },
      });

      // Trigger disbursement process
      // TODO: Integrate with smart contract for fund reservation
      // TODO: Initiate off-ramp process for bank transfer

      // Simulate disbursement (in production, this would be handled by a separate service)
      await prisma.advance.update({
        where: { id: requestId },
        data: {
          status: EnumAdvancesStatus.DISBURSED,
          disbursementDate: new Date(),
        },
      });

      // Update employer statistics
      await prisma.employer.update({
        where: { id: employer.id },
        data: {
          totalAdvancesProcessed: employer.totalAdvancesProcessed + 1,
        },
      });

      // Log the approval for audit purposes
      console.log(`Advance ${requestId} approved by employer ${employer.id} (user: ${userId})`);

      const response = {
        advanceId: updatedAdvance.id,
        status: EnumAdvancesStatus.DISBURSED,
        approvalDate: updatedAdvance.approvalDate,
        disbursementDate: new Date(),
        message: "Advance approved successfully. Funds will be disbursed within 2-5 minutes.",
      };

      sendSuccess(res, response, "Advance approved successfully", 200);
    } catch (error) {
      console.error("Error approving advance:", error);
      sendError(res, error, "Failed to approve advance", 500);
      next(error);
    }
  },

  /**
   * Reject an advance request
   * Endpoint: POST /api/v1/employer/advance/:requestId/reject
   */
  async rejectAdvance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;
      const { requestId } = req.params;
      const { rejectionReason }: RejectionBody = req.body;

      if (!userId) {
        sendError(res, null, "Unauthorized: User ID not found", 401);
        return;
      }

      if (!rejectionReason) {
        sendError(res, null, "Rejection reason is required", 400);
        return;
      }

      // Get employer
      const employer = await prisma.employer.findUnique({
        where: { userId },
      });

      if (!employer) {
        sendError(res, null, "Employer record not found", 404);
        return;
      }

      // Get advance request
      const advance = await prisma.advance.findUnique({
        where: { id: requestId },
        include: {
          employee: true,
        },
      });

      if (!advance) {
        sendError(res, null, "Advance request not found", 404);
        return;
      }

      if (advance.employerId !== employer.id) {
        sendError(res, null, "Unauthorized to reject this advance request", 403);
        return;
      }

      if (advance.status !== EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL) {
        sendError(res, null, "This advance request is not pending approval", 400);
        return;
      }

      // Update advance status to rejected
      const updatedAdvance = await prisma.advance.update({
        where: { id: requestId },
        data: {
          status: EnumAdvancesStatus.REJECTED,
          rejectedBy: userId,
          rejectionReason,
        },
      });

      // Restore employee's advance balance
      await prisma.employee.update({
        where: { id: advance.employeeId },
        data: {
          currentAdvanceBalance: new Decimal(
            advance.employee.currentAdvanceBalance || 0
          ).minus(advance.amount),
        },
      });

      // TODO: Send notification to employee about rejection

      const response = {
        advanceId: updatedAdvance.id,
        status: updatedAdvance.status,
        rejectionReason,
        message: "Advance request rejected successfully",
      };

      sendSuccess(res, response, "Advance rejected successfully", 200);
    } catch (error) {
      console.error("Error rejecting advance:", error);
      sendError(res, error, "Failed to reject advance", 500);
      next(error);
    }
  },

  /**
   * Get all advances for employer's employees
   * Endpoint: GET /api/v1/employer/advances/all
   */
  async getAllAdvances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;
      const { status, employeeId, limit = 20, offset = 0 } = req.query;

      if (!userId) {
        sendError(res, null, "Unauthorized: User ID not found", 401);
        return;
      }

      // Get employer
      const employer = await prisma.employer.findUnique({
        where: { userId },
      });

      if (!employer) {
        sendError(res, null, "Employer record not found", 404);
        return;
      }

      const whereClause: any = { employerId: employer.id };

      if (status) {
        whereClause.status = status as EnumAdvancesStatus;
      }

      if (employeeId) {
        whereClause.employeeId = employeeId as string;
      }

      const advances = await prisma.advance.findMany({
        where: whereClause,
        include: {
          employee: {
            include: {
              user: {
                select: {
                  email: true,
                  username: true,
                },
              },
            },
          },
        },
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
          employeeId: advance.employeeId,
          employeeName: advance.employee.user.username || advance.employee.user.email,
          employeeEmail: advance.employee.user.email,
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
          approvedBy: advance.approvedBy,
          rejectedBy: advance.rejectedBy,
          rejectionReason: advance.rejectionReason,
        })),
        total,
        limit: Number(limit),
        offset: Number(offset),
      };

      sendSuccess(res, response, "Advances retrieved successfully", 200);
    } catch (error) {
      console.error("Error getting advances:", error);
      sendError(res, error, "Failed to retrieve advances", 500);
      next(error);
    }
  },

  /**
   * Get advance statistics for the employer
   * Endpoint: GET /api/v1/employer/advances/statistics
   */
  async getAdvanceStatistics(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;

      if (!userId) {
        sendError(res, null, "Unauthorized: User ID not found", 401);
        return;
      }

      // Get employer
      const employer = await prisma.employer.findUnique({
        where: { userId },
      });

      if (!employer) {
        sendError(res, null, "Employer record not found", 404);
        return;
      }

      // Get various statistics
      const [
        totalAdvances,
        pendingAdvances,
        approvedAdvances,
        disbursedAdvances,
        repaidAdvances,
        defaultedAdvances,
        totalAmountStats,
        totalRepaidStats,
        totalDefaultedStats,
        activeEmployees,
      ] = await Promise.all([
        prisma.advance.count({
          where: { employerId: employer.id },
        }),
        prisma.advance.count({
          where: {
            employerId: employer.id,
            status: EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL,
          },
        }),
        prisma.advance.count({
          where: {
            employerId: employer.id,
            status: EnumAdvancesStatus.APPROVED,
          },
        }),
        prisma.advance.count({
          where: {
            employerId: employer.id,
            status: EnumAdvancesStatus.DISBURSED,
          },
        }),
        prisma.advance.count({
          where: {
            employerId: employer.id,
            status: EnumAdvancesStatus.REPAID,
          },
        }),
        prisma.advance.count({
          where: {
            employerId: employer.id,
            status: EnumAdvancesStatus.DEFAULTED,
          },
        }),
        prisma.advance.aggregate({
          where: { employerId: employer.id },
          _sum: { amount: true },
        }),
        prisma.advance.aggregate({
          where: {
            employerId: employer.id,
            status: EnumAdvancesStatus.REPAID,
          },
          _sum: { repaymentAmount: true },
        }),
        prisma.advance.aggregate({
          where: {
            employerId: employer.id,
            status: EnumAdvancesStatus.DEFAULTED,
          },
          _sum: { amount: true },
        }),
        prisma.employee.count({
          where: {
            employerId: employer.id,
            currentAdvanceBalance: { gt: 0 },
          },
        }),
      ]);

      const defaultRate = totalAdvances > 0
        ? (defaultedAdvances / totalAdvances) * 100
        : 0;

      const response = {
        summary: {
          totalAdvances,
          pendingAdvances,
          approvedAdvances,
          disbursedAdvances,
          repaidAdvances,
          defaultedAdvances,
          activeEmployees,
        },
        amounts: {
          totalAdvanceAmount: totalAmountStats._sum.amount?.toString() || "0",
          totalRepaidAmount: totalRepaidStats._sum.repaymentAmount?.toString() || "0",
          totalDefaultedAmount: totalDefaultedStats._sum.amount?.toString() || "0",
        },
        metrics: {
          defaultRate: defaultRate.toFixed(2),
          employerTier: employer.tier,
          advancePercentageLimit: employer.advancePercentageLimit,
          autoApproveAdvances: employer.autoApproveAdvances,
          totalAdvancesProcessed: employer.totalAdvancesProcessed,
        },
      };

      sendSuccess(res, response, "Advance statistics retrieved successfully", 200);
    } catch (error) {
      console.error("Error getting advance statistics:", error);
      sendError(res, error, "Failed to retrieve advance statistics", 500);
      next(error);
    }
  },

  /**
   * Update employer advance settings
   * Endpoint: PUT /api/v1/employer/advances/settings
   */
  async updateAdvanceSettings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;
      const { autoApproveAdvances, advancePercentageLimit } = req.body;

      if (!userId) {
        sendError(res, null, "Unauthorized: User ID not found", 401);
        return;
      }

      // Get employer
      const employer = await prisma.employer.findUnique({
        where: { userId },
      });

      if (!employer) {
        sendError(res, null, "Employer record not found", 404);
        return;
      }

      // Validate advance percentage limit based on tier
      if (advancePercentageLimit !== undefined) {
        let maxLimit = 10;
        switch (employer.tier) {
          case "NEW":
            maxLimit = 10;
            break;
          case "API_VERIFIED":
            maxLimit = 30;
            break;
          case "PLATFORM_TRUSTED":
            maxLimit = 50;
            break;
        }

        if (advancePercentageLimit < 0 || advancePercentageLimit > maxLimit) {
          sendError(
            res,
            null,
            `Advance percentage limit must be between 0 and ${maxLimit} for your tier`,
            400
          );
          return;
        }
      }

      const updateData: any = {};
      if (autoApproveAdvances !== undefined) {
        updateData.autoApproveAdvances = autoApproveAdvances;
      }
      if (advancePercentageLimit !== undefined) {
        updateData.advancePercentageLimit = advancePercentageLimit;
      }

      const updatedEmployer = await prisma.employer.update({
        where: { id: employer.id },
        data: updateData,
      });

      const response = {
        autoApproveAdvances: updatedEmployer.autoApproveAdvances,
        advancePercentageLimit: updatedEmployer.advancePercentageLimit,
        tier: updatedEmployer.tier,
        message: "Advance settings updated successfully",
      };

      sendSuccess(res, response, "Settings updated successfully", 200);
    } catch (error) {
      console.error("Error updating advance settings:", error);
      sendError(res, error, "Failed to update advance settings", 500);
      next(error);
    }
  },
};
