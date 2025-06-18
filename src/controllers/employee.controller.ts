import { Request, Response, NextFunction } from "express";
import {
  Controller,
  Get,
  Route,
  Path,
  Post,
  Body,
  SuccessResponse,
  Tags,
  Security,
} from "tsoa";
import { User, Employer, Employee, Invitation } from "../models/index";
import { KycStage, KycStatus } from "../models/Employee"; // Import KycStage and KycStatus
// import { ApiError } from "../utils/errors/index"; // Removed ApiError import
import { TokenPayload } from "../types";

// Define a type for the expected request body (optional)
interface AcceptInvitationRequestBody {
  timestampAccepted?: string; // ISO 8601 string
}

export const employeeController = {
  async invite(
    req: Request<{ invitationId: string }, {}, AcceptInvitationRequestBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const invitationId = req.params.invitationId;
      const timestampAccepted = req.body.timestampAccepted; // Optional

      if (!invitationId) {
        res.status(404).json({ message: "invitationId field missing." });
      }

      console.log(`Received request to accept invitation: ${invitationId}`);
      if (timestampAccepted) {
        console.log(`Acceptance timestamp: ${timestampAccepted}`);
      }

      // 1. Find the invitation
      const invitation = await Invitation.findOne({
        where: { invitationId: invitationId },
      });

      // Check if the invitation exists
      if (!invitation) {
        console.error(`Invitation with ID ${invitationId} not found.`);
        res.status(404).json({ message: "Invitation not found." });
        return;
      }

      // 2. Check if the invitation has expired
      const now = new Date();
      if (invitation.expiresAt < now) {
        console.error(`Invitation with ID ${invitationId} has expired.`);
        // Update status if expired
        if (invitation.status !== "expired") {
          await invitation.update({ status: "expired" });
        }
        res.status(400).json({ message: "Invitation has expired." });
        return;
      }

      // 3. Check if the invitation has already been accepted or rejected
      if (invitation.status !== "pending") {
        console.warn(
          `Invitation with ID ${invitationId} is already in status: ${invitation.status}.`,
        );
        res.status(400).json({
          message: `Invitation has already been ${invitation.status}.`,
        });
        return;
      }

      // 4. Verify the authenticated user and link to invitation target
      const payload = req.user as TokenPayload; // Assuming auth middleware attaches user info to req.user
      const authenticatedUser = await User.findOne({
        where: { id: payload.userId },
      });

      // Ensure user exists and their email matches the invitation target
      if (
        !authenticatedUser ||
        authenticatedUser.email !== invitation.targetEmail
      ) {
        console.error(
          `Invitation target email ${invitation.targetEmail} does not match authenticated user email ${authenticatedUser?.email}.`,
        );
        res.status(403).json({ message: "This invitation is not for you." });
        return;
      }

      // 5. Find the employer associated with the invitation sender
      // Note: Assumes invitation.sentByUserId links directly to an Employer's userId
      // A more robust system might have the invitation link directly to an employerId
      const employer = await Employer.findOne({
        where: { userId: invitation.sentByUserId },
      });

      if (!employer) {
        console.error(
          `Employer not found for sending user ID: ${invitation.sentByUserId}. Invitation ID: ${invitationId}`,
        );
        // This indicates an internal data issue or invalid invitation data
        res.status(500).json({
          message:
            "Failed to link employee to employer. Employer data invalid.",
        });
        // Consider logging this as a critical error and potentially alerting admins
        return;
      }

      // 6. Check if an Employee record already exists for this user under this employer
      const existingEmployee = await Employee.findOne({
        where: {
          userId: authenticatedUser.id,
          employerId: employer.id,
        },
      });

      // Use a transaction for atomicity if creating Employee and updating Invitation
      // import { sequelize } from "../config/database"; // Add sequelize import if needed for transactions

      if (existingEmployee) {
        console.warn(
          `Employee record already exists for user ${authenticatedUser.id} under employer ${employer.id}.`,
        );
        // If employee already exists, consider it accepted implicitly
        if (invitation.status === "pending") {
          await invitation.update({ status: "accepted" });
          console.log(
            `Updated invitation ${invitationId} status to accepted due to existing employee record.`,
          );
        }
        res.status(200).json({
          status: "existing", // Indicate that the employee link already exists
          message: "Employee is already linked to this employer.",
          // Optionally return existing employee details or status
        });
        return;
      } else {
        // 7. Create the new Employee record
        // This will automatically set kycStage to NONE and kycStatus to PENDING due to model defaults
        await Employee.create({
          userId: authenticatedUser.id,
          employerId: employer.id,
          // registrationDate defaults to NOW
          // kycStage defaults to KycStage.NONE
          // kycStatus defaults to KycStatus.PENDING
        });

        console.log(
          `Successfully created Employee record for user ${authenticatedUser.id} under employer ${employer.id}.`,
        );
      }

      // 8. Update invitation status to accepted
      await invitation.update({ status: "accepted" });
      console.log(`Updated invitation ${invitationId} status to accepted.`);

      // 9. Respond to the client
      // The new employee is in a pending KYC state by default based on model definitions
      res.status(200).json({
        status: "pending_kyc", // Reflects the state based on the created Employee record
        message: "Invitation accepted. Please proceed to KYC verification.",
      });
      // No explicit return needed here as res.json() sends the response
    } catch (error) {
      // Pass unexpected errors to the error handling middleware
      console.error(
        `Error accepting invitation ${req.params.invitationId}:`,
        error,
      );
      next(error);
    }
  },
  async getKYC(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Get the authenticated user ID from the token payload
      const payload = req.user as TokenPayload;
      const authenticatedUserId = payload.userId;

      console.log(
        `Received request to get KYC status for user ID: ${authenticatedUserId}`,
      );

      // 1. Find the Employee record for the authenticated user
      const employee = await Employee.findOne({
        where: { userId: authenticatedUserId },
      });

      // 2. Check if the employee record exists
      if (!employee) {
        console.warn(
          `Employee record not found for user ID ${authenticatedUserId}. User is not an employee.`,
        );
        // It's possible the user is authenticated but is an employer or has no role yet linked
        res
          .status(403)
          .json({ message: "You are not registered as an employee." });
        return;
      }

      console.log(`Found employee record for user ID ${authenticatedUserId}.`);

      // 3. Send the KYC stage and status as response
      res.status(200).json({
        currentKycStage: employee.kycStage,
        currentKycStatus: employee.kycStatus,
        message: "Successfully retrieved employee KYC status.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred", error: error });
    }
  },
  async submitKYC(
    req: Request<{}, {}, AcceptInvitationRequestBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Get the authenticated user ID from the token payload
      const payload = req.user as TokenPayload;
      const authenticatedUserId = payload.userId;

      console.log(
        `Received request to submit KYC for user ID: ${authenticatedUserId}`,
      );

      // 1. Find the Employee record for the authenticated user
      const employee = await Employee.findOne({
        where: { userId: authenticatedUserId },
      });

      // Check if the employee record exists
      if (!employee) {
        console.error(
          `Employee record not found for user ID ${authenticatedUserId}.`,
        );
        res
          .status(404)
          .json({ message: "Employee record not found. Cannot submit KYC." });
        return;
      }

      console.log(
        `Found employee record for user ID ${authenticatedUserId}. Current KYC Stage: ${employee.kycStage}, Status: ${employee.kycStatus}`,
      );

      // 2. Check current KYC status - prevent resubmission if already submitted/under review for the current stage
      if (
        employee.kycStatus === KycStatus.SUBMITTED ||
        employee.kycStatus === KycStatus.IN_REVIEW
      ) {
        console.warn(
          `KYC already submitted or in review for user ID ${authenticatedUserId}. Current Status: ${employee.kycStatus}`,
        );
        res.status(400).json({
          message: `Your KYC submission is currently ${employee.kycStatus}. Please wait for review.`,
          currentKycStatus: employee.kycStatus,
          currentKycStage: employee.kycStage,
        });
        return;
      }

      // 3. Determine which KYC stage the user is submitting for based on their current stage
      // This endpoint handles submission for the 'next' logical step.
      // Assuming this endpoint is primarily for the initial Level 1 submission.
      if (
        employee.kycStage !== KycStage.NONE &&
        employee.kycStage !== KycStage.LEVEL_1
      ) {
        console.warn(
          `User ID ${authenticatedUserId} is trying to submit Level 1 KYC but is already past stage ${employee.kycStage}.`,
        );
        res.status(400).json({
          message: `You have already completed or are past KYC Stage ${employee.kycStage}. This endpoint is for initial submission.`,
          currentKycStage: employee.kycStage,
        });
        return;
      }

      // 4. Process submitted data (Placeholder)
      // In a real application, you would handle file uploads (e.g., using multer)
      // or parse base64 documents/form data from req.body here.
      // Validate that necessary Level 1 documents/information are present.
      // Example: const { documentType1, documentType2, ... } = req.body;
      // Basic validation placeholder:
      // if (!req.body.someRequiredField) {
      //   res.status(400).json({ message: "Required KYC documents or information missing." });
      //   return;
      // }
      console.log(
        `Processing Level 1 KYC submission data (placeholder logic)...`,
      );

      // 5. Update the Employee record status for KYC submission
      // Update kycStage to LEVEL_1 if it was NONE
      const updateData: any = {
        kycStatus: KycStatus.SUBMITTED, // Or KycStatus.IN_REVIEW if review is immediate
        kycSubmittedAt: new Date(),
        // kycNotes: 'Level 1 submission received', // Optional note
      };

      if (employee.kycStage === KycStage.NONE) {
        updateData.kycStage = KycStage.LEVEL_1;
      }

      await employee.update(updateData);

      console.log(
        `Employee record updated for user ID ${authenticatedUserId}. New KYC Stage: ${employee.kycStage === KycStage.NONE ? KycStage.LEVEL_1 : employee.kycStage}, New Status: ${KycStatus.SUBMITTED}`,
      );

      // 6. Respond to the client
      // The user has submitted Level 1. Verification will happen later.
      // The prompt mentions redirection *after* verification/stage update,
      // which happens in a separate process, not immediately upon submission.
      res.status(200).json({
        status: "submission_received",
        message: "Level 1 KYC submission received. It is now pending review.",
        currentKycStage:
          employee.kycStage === KycStage.NONE
            ? KycStage.LEVEL_1
            : employee.kycStage,
        currentKycStatus: KycStatus.SUBMITTED,
      });

      // Note: The logic for verifying documents and updating the kycStage to APPROVED_LEVEL_1,
      // and then prompting/redirecting for Level 2, would occur in a separate process
      // (e.g., an admin review panel or an automated verification system) and would be
      // handled by a different endpoint or background task. This endpoint only receives the submission.
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
