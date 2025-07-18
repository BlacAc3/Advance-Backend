import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types";
import invitationModel from "../db/services/invitation";
import userModel from "../db/services/user";
import { prisma } from "../db/database";

export const adminController = {
  async getUsers(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await userModel.getAll();
      res.json(users);
      return;
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users" });
      return;
    }
  },

  async getInvitations(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Admin should be able to see all invitations, optionally filtered by status
      const statusFilter = req.query.status as any; // Get status from query params

      let status: "pending" | "accepted" | "rejected" | "expired" =
        statusFilter;

      const invitations = await invitationModel.getAll();
      res.status(200).json(invitations);
      return;
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  },

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { role, isActive } = req.body;

      const user = await userModel.get({ id });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (role && !Object.values(UserRole).includes(role)) {
        res.status(400).json({ message: "Invalid role" });
        return;
      }

      // Update the user using Prisma
      await prisma.user.update({
        where: { id },
        data: {
          role: role || user.role,
          isActive: isActive !== undefined ? isActive : user.isActive,
        },
      });

      // Fetch the updated user
      const updatedUser = await userModel.get({ id });

      if (!updatedUser) {
        res.status(500).json({ message: "Failed to retrieve updated user" });
        return;
      }

      res.json({
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        isActive: updatedUser.isActive,
      });
      return;
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user" });
      return;
    }
  },

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userModel.get({ id });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      await prisma.user.delete({
        where: { id },
      });
      res.status(204).send();
      return;
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
      return;
    }
  },
  async getEmployers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const employers = await prisma.employer.findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              username: true,
            },
          },
          marketer: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          registrationDate: 'asc',
        },
      });

      res.status(200).json(employers);
      return;
    } catch (error) {
      console.error("Error getting employers:", error);
      res.status(500).json({ message: "Error getting employers" });
      return;
    }
  },
};
