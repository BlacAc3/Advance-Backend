import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./User"; // Assuming User model exists and invitations can be sent by Users
import { UserRole } from "../types";
import { Employee } from "../models/Employee";

export class Invitation extends Model {
  public id!: number;
  public invitationId!: string; // Unique ID for the invitation link/code
  public target!: Employee; // Employee the invitation is sent to
  public targetEmail!: string; //Email invitation is sent to
  public sentByUserId?: number; // Optional: User who sent the invitation
  public expiresAt!: Date; // Expiration date for the invitation
  public status!: "pending" | "accepted" | "rejected" | "expired"; // Status of the invitation

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly sentBy?: User;
}

Invitation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    invitationId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("employer", "employee"),
      allowNull: false,
    },
    sentByUserId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow system-sent invitations or if sender isn't tracked
      references: {
        model: "users", // Assuming 'users' is the table name for the User model
        key: "id",
      },
    },
    targetEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Basic email validation
      },
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected", "expired"),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "invitations",
    timestamps: true,
  },
);

// Define associations
Invitation.belongsTo(User, {
  foreignKey: "sentByUserId",
  as: "sentBy",
});
