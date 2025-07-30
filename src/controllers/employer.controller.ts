import { Request, Response, NextFunction } from "express";
import { UserRole, TokenPayload, UserResponse } from "../types";
import { generateTokenPair } from "../utils/jwt";
import { prisma } from "../db/database";
import { EnumPayrollStatus } from "../generated/prisma";
import fs from "fs";

//DB services
import userModel from "../db/services/user";
import employerModel from "../db/services/employer";
import invitationModel from "../db/services/invitation";
import { register } from "../utils/register";
import { sendSuccess, sendError } from "../utils/responseWrapper";
import {
  parseCsvFile,
  parseExcelFile,
  parseJsonFile,
} from "../utils/payrollParser";

export const employerController = {
  async sendInvite(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.body;
      const senderId = req.user?.userId as string;
      const role = "EMPLOYEE"; // Assuming default role is employee
      const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);
      const existingInvitation = await invitationModel.getPending({
        email,
        senderId: senderId,
        role,
      });
      if (existingInvitation) {
        sendError(
          res,
          null,
          "Invitation for the target user already exists",
          400,
        );
        return;
      }

      const invitation = await invitationModel.create({
        email,
        senderId,
        role,
        expiresAt,
      });
      sendSuccess(res, invitation, "Invitation sent successfully", 200);
      return;
    } catch (error) {
      console.error(error);
      sendError(res, error, "Failed to send invitation", 400);
      next(error);
    }
  },
  async employerRegister(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await register({
        req,
        res,
        role: UserRole.EMPLOYER,
        additionalValidations: (req, res) => {
          const { companyName } = req.body;
          const { invitationId } = req.body;
          if (!companyName) {
            sendError(res, null, "companyName field required", 400);
            return false;
          }
          const invitation = invitationModel.get({ id: invitationId });

          if (!invitation) {
            sendError(res, null, "Invitation not found", 404);
            return false;
          }
          return true;
        },
        additionalUserCreation: async (user, req, res) => {
          const { companyName } = req.body;
          const { invitationId } = req.body;
          const invitation = await invitationModel.get({ id: invitationId });

          if (!invitation) {
            sendError(res, null, "Invitation not found", 404);
            return;
          }
          const employer = await employerModel.create({
            userId: user.id,
            companyName: companyName,
            registrationDate: new Date(),
            isVerified: false,
          });

          const senderMarketer = await prisma.marketer.findUnique({
            where: { userId: invitation.senderUserId },
          });

          // If the sender was a marketer, Update the marketerId field
          if (senderMarketer) {
            await prisma.employer.update({
              where: { id: employer.id },
              data: { marketerId: senderMarketer.id },
            });
          }

          const tokens = await generateTokenPair(user);

          const userResponse = {
            id: user.id,
            email: user.email,
            role: user.role,
            walletAddress: user.walletAddress,
            isWalletVerified: user.isWalletVerified,
          };

          sendSuccess(
            res,
            { ...tokens, user: userResponse },
            "Employer registered successfully",
            201,
          );
          return;
        },
      });
    } catch (error) {
      console.error(error);
      sendError(res, error, "Employer registration failed", 400);
      next(error);
    }
  },
  async setupApiIntegration(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const employerId = req.params.id;

      //TODO: Implement Bank-history client integration (Mono/Okra)
      //TODO: Fetch 6 months' bank history

      // In a real application, you'd validate the API credentials,
      // fetch bank history, and update the employer's tier accordingly.
      // For now, we'll just return a dummy response.
      sendSuccess(
        res,
        {
          message: `API integration setup successfully for employer ${employerId}.`,
          tier: "API-Verified", // Assuming successful API integration upgrades the tier
          advanceLimit: "30%", // Updated advance limit
        },
        "API integration setup successfully",
        200,
      );
    } catch (error) {
      sendError(res, error, "API integration setup failed");
      console.error(error);
      next(error);
    }
  },
  async uploadPayroll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.file) {
        sendError(res, null, "No file uploaded.", 400);
        return;
      }

      // Assume employerId is sent in the request body (e.g., from a hidden input or client-side JavaScript)
      // In a real app, you'd get this from user authentication (e.g., JWT token)
      const { employerId } = req.body;

      if (!employerId) {
        // Clean up the uploaded file if employerId is missing
        fs.unlink(req.file.path, (err) => {
          if (err) console.error(`Error deleting file:`, err);
        });
        sendError(res, null, "Employer ID is required.", 400);
        return;
      }

      const filePath = req.file.path;
      const originalname = req.file.originalname;
      const mimetype = req.file.mimetype;

      try {
        // 1. Verify Employer and check existing uploads
        const employer = employerModel.get({ id: employerId });

        if (!employer) {
          fs.unlink(filePath, (err) => {
            if (err) console.error(`Error deleting file:`, err);
          });
          sendError(res, null, "Employer not found.", 404);
          return;
        }

        // if (employer.payrollUploads.length >= 3) {
        //   fs.unlink(filePath, (err) => {
        //     if (err) console.error(`Error deleting file:`, err);
        //   });
        //   return res.status(403).json({
        //     message:
        //       "Employer has reached the maximum limit of 3 payroll uploads.",
        //   });
        // }

        // 2. Parse the file
        let parsedData = [];
        if (mimetype === "text/csv") {
          parsedData = await parseCsvFile(filePath);
        } else if (
          mimetype === "application/vnd.ms-excel" ||
          mimetype ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          parsedData = await parseExcelFile(filePath);
        } else if (mimetype === "application/json") {
          parsedData = await parseJsonFile(filePath);
        } else {
          fs.unlink(filePath, (err) => {
            if (err) console.error(`Error deleting file:`, err);
          });
          sendError(res, null, "Unsupported file type.", 400);
          return;
        }

        // --- IMPORTANT: Further Data Validation and Sanitization ---
        // Before saving to DB, perform rigorous validation (e.g., ensure mandatory fields exist, correct data types, business rules).
        // Hash/Encrypt sensitive data within each record in `parsedData`.

        // 3. Save parsed data to the database
        const newPayrollUpload = await prisma.payroll.create({
          data: {
            employerId: employerId,
            originalFileName: originalname,
            fileMimeType: mimetype,
            parsedData: parsedData as any, // Store the array of parsed records
            status: EnumPayrollStatus.UPLOADED, // Or "processed" if you do immediate processing
          },
        });

        // console.log(
        //   `Successfully parsed and saved ${parsedData.length} payroll records for employer ${employer.name}.`,
        // );

        sendSuccess(
          res,
          {
            recordsCount: parsedData.length,
          },
          "Payroll file uploaded, parsed, and saved successfully!",
          200,
        );
      } catch (error: any) {
        console.error(
          `Error processing payroll file ${originalname} for employer ${employerId}:`,
          error,
        );
        sendError(
          res,
          error,
          `Error processing payroll file: ${error.message}`,
          500,
        );
      } finally {
        // Clean up the temporary uploaded file
        fs.unlink(filePath, (err) => {
          if (err)
            console.error(`Error deleting uploaded file ${filePath}:`, err);
          else console.log(`Deleted temporary file: ${filePath}`);
        });
      }
    } catch (error) {
      sendError(res, error, "Failed to retrieve employer tiers");
      console.error(error);
      next(error);
    }
  },
  async getEmployees(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.userId as string;
      const user = await userModel.get({ id: userId });

      const employerId = user?.employer?.id;
      if (!employerId) {
        sendError(res, null, "User must be an employer.", 400);
        return;
      }
      const employer = await employerModel.get({ id: employerId });
      if (!employer) {
        sendError(res, null, "This user does not seem to be an employer!");
        return;
      }
      sendSuccess(res, employer.employees, "", 200);
      return;
    } catch (error) {
      sendError(res, error, "Failed to retrieve employer tiers", 400);
      console.error(error);
      next(error);
    }
  },
};
