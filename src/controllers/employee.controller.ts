import { Request, Response, NextFunction } from "express";
import { generateTokenPair } from "../utils/jwt";
import { TokenPayload, UserRole } from "../types";
import { prisma } from "../db/database";
import invitationModel from "../db/services/invitation";
import employeeModel from "../db/services/employee";
import userModel from "../db/services/user";
import { register } from "../utils/register";

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
};
