import { NextFunction, Request, Response } from "express";
import { User, Invitation, Employer, Marketer } from "../models/index";
import { UserRole } from "../types";

export const adminController = {
  async getUsers(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await User.findAll({
        attributes: ["id", "email", "role", "isActive", "createdAt"],
        order: [["createdAt", "DESC"]],
      });
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
      const statusFilter = req.query.status as string | undefined; // Get status from query params

      // Build the where clause
      const whereClause: any = {};

      // Add status filter if provided and is a valid status (matching Invitation model enum)
      const validStatuses = ["pending", "accepted", "rejected", "expired"];
      if (statusFilter && validStatuses.includes(statusFilter)) {
        whereClause.status = statusFilter;
      }

      const invitations = await Invitation.findAll({
        where: whereClause, // Use the built where clause
        include: [
          {
            model: User,
            as: "sender",
            attributes: ["id", "username", "email"], // Specify the attributes you want to retrieve
          },
          {
            model: User,
            as: "receiver",
            attributes: ["id", "username", "email", "role"],
          },
        ],
        order: [["createdAt", "DESC"]], // Order by creation date, newest first
      });
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

      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (role && !Object.values(UserRole).includes(role)) {
        res.status(400).json({ message: "Invalid role" });
        return;
      }

      await user.update({
        role: role || user.role,
        isActive: isActive !== undefined ? isActive : user.isActive,
      });

      res.json({
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
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
      const user = await User.findByPk(id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      await user.destroy();
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
      const employers = await Employer.findAll({
        attributes: [
          "id",
          "companyName",
          "registrationDate",
          "isVerified",
          "verificationDate",
        ],
        include: [
          {
            model: User,
            as: "owner",
            attributes: ["id", "email", "role", "username"], // Include user details
          },
          {
            model: Marketer, // Correctly associate with Marketer model
            as: "invitedBy",
            attributes: ["id"], // Attributes from the Marketer model itself (e.g., id)
            include: [
              {
                model: User, // Include the User associated with the Marketer
                as: "user",
                attributes: ["id", "username", "email"], // Include user details for the marketer
              },
            ],
            required: false, // Make the inclusion optional in case an employer wasn't invited by a marketer
          },
        ],
        order: [["registrationDate", "DESC"]],
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
