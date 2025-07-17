import { Request, Response, NextFunction } from "express";
import { generateTokenPair } from "../utils/jwt";
import { TokenPayload, UserRole } from "../types";
import { prisma } from "../db/database";
import invitationModel from "../db/services/invitation";
import employeeModel from "../db/services/employee";
import userModel from "../db/services/user";
import { register } from "../utils/register";
import {
  EnumEmployeesKycStage,
  EnumEmployeesKycStatus,
} from "../generated/prisma";

export const employeeController = {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await register({
        req,
        res,
        role: UserRole.EMPLOYEE,
        additionalUserCreation: async (user, req, res) => {
          const { invitationId } = req.body;
          const invitation = await invitationModel.get({ id: invitationId });

          if (!invitation) {
            throw new Error("Invitation not found");
          }

          const employee = await employeeModel.create({
            userId: user.id,
            employerId: invitation.senderUserId,
            registrationDate: new Date(),
          });

          //TODO: add the following functionality to the employer class
          const senderEmployer = await prisma.employer.findUnique({
            where: { userId: invitation.senderUserId },
          });

          if (senderEmployer) {
            await prisma.employee.update({
              where: { id: employee.id },
              data: { employerId: senderEmployer.id },
            });
          }
        },
      });
    } catch (error) {
      console.error(
        `Error accepting invitation ${req.params.invitationId}:`,
        error,
      );
      next(error);
    }
  },
  async submitKyc(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Assuming req.user is populated by authentication middleware
      const userId = (req.user as TokenPayload)?.userId;

      const user = await userModel.get({ id: userId });
      const employee = await employeeModel.get({ userId });

      if (employee?.kycStage === EnumEmployeesKycStage.level_1) {
        const { nin, bvn } = req.body;
        if (typeof nin !== "string" || !/^\d{11}$/.test(nin)) {
          res.status(400).json({ message: "NIN must be an 11-digit number." });
          return;
        }
        if (typeof bvn !== "string" || !/^\d{11}$/.test(bvn)) {
          res.status(400).json({ message: "BVN must be an 11-digit number." });
          return;
        }
        await prisma.employee.update({
          where: {
            id: employee.id,
          },
          data: {
            kycStage: employee?.kycStage,
            kycStatus: EnumEmployeesKycStatus.in_review,
            kycSubmittedAt: new Date(),
            nin: nin,
            bvn: bvn,
          },
        });
        //TODO: Add automatic NIN and BVN Verification
        res.status(200).json({
          message:
            "KYC Level 1 (NIN and BVN) submission received successfully. It is now awaiting review.",
          submittedKycStage: EnumEmployeesKycStage.level_1,
          nextKycStage: EnumEmployeesKycStage.level_2,
          currentKycStatus: employee.kycStatus,
        });
        return;
      }
    } catch (error) {
      console.error(
        `Error submitting KYC for user ${req.user ? (req.user as TokenPayload).userId : "unknown"}:`,
        error,
      );
      next(error); // Pass the error to the Express error handling middleware
    }
  },
  async registerBankaccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;

      const user = await userModel.get({ id: userId });
      const employee = await employeeModel.get({ userId });
      if (employee?.kycStage === EnumEmployeesKycStage.level_2) {
        if (!employee.kycStageLevel1Completed) {
          res.status(400).json({
            message:
              "Their is a mismatch your last kyc stage is incomplete. Kindly contact the admin!",
            currentKycStage: employee.kycStage,
          });
        }
        //TODO: Write logic to verify and add the bank account details for the user to the db.
      }
    } catch (error) {
      console.error(
        `Error submitting KYC for user ${req.user ? (req.user as TokenPayload).userId : "unknown"}:`,
        error,
      );
      next(error); // Pass the error to the Express error handling middleware
    }
  },
  async acceptTerms(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = (req.user as TokenPayload)?.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized: User ID not found." });
        return;
      }
      const employee = await employeeModel.get({ userId });

      if (!employee) {
        res
          .status(404)
          .json({ message: "Employee record not found for this user." });
        return;
      }

      if (employee?.kycStage === EnumEmployeesKycStage.level_3) {
        if (
          !employee.kycStageLevel1Completed ||
          !employee.kycStageLevel2Completed ||
          !employee.kycStageLevel3Completed
        ) {
          res.status(400).json({
            message:
              "Their is a mismatch your last kyc stage is incomplete. Kindly contact the admin!",
            currentKycStage: employee.kycStage,
          });
        }

        // Check if terms are already accepted
        if (employee.termsAccepted) {
          res
            .status(200)
            .json({ message: "Terms and conditions already accepted." });
          return;
        }

        await prisma.employee.update({
          where: {
            id: employee.id,
          },
          data: {
            termsAccepted: true,
            termsAcceptedAt: new Date(),
          },
        });

        res.status(200).json({
          message: "Terms and conditions accepted successfully.",
        });

        //TODO: Write logic where the employee will not be verified finally until the employer has completed all its levels
      } // Corrected: Added the missing closing brace for the `if (employee?.kycStage === EnumEmployeesKycStage.level_3)` block here.
    } catch (error) {
      console.error(
        `Error accepting terms and conditions for user ${req.user ? (req.user as TokenPayload).userId : "unknown"}:`,
        error,
      );
      next(error);
    }
  },
};
