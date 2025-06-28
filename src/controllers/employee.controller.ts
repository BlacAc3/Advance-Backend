import { Request, Response, NextFunction } from "express";
import { generateTokenPair } from "../utils/jwt";
import { TokenPayload, UserRole } from "../types";
import { invitations, employees, employers } from "../db/schema";
import { db } from "../db/config";
import { eq, and } from "drizzle-orm";
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

          const employee = await employeeModel.create({
            userId: user.id,
            employerId: invitation.senderUserId,
            registrationDate: new Date(),
          });

          //TODO: add the following functionality to the employer class
          const [senderEmployer] = await db
            .select()
            .from(employers)
            .where(eq(employers.userId, invitation.senderUserId))
            .limit(1);
          if (senderEmployer) {
            await db
              .update(employees)
              .set({ employerId: senderEmployer.id })
              .where(eq(employees.id, employee.id));
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
