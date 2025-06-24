import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./User"; // Assuming User model exists and invitations can be sent by Users
import { UserRole } from "../types";
import { Employee } from "../models/Employee";

class Invitation extends Model {
  public id!: string;
  public targetEmail!: string;
  public senderUserId!: string;
  public recipientUserId?: string;
  public expiresAt!: Date;
  public status!: "pending" | "accepted" | "rejected" | "expired";
  public role!: "employer" | "employee";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Invitation.init(
  {
    id: {
      // Changed to DataTypes.UUID to match other models and consistency
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    role: {
      // Changed to enum of strings to match model definition
      type: DataTypes.ENUM("employer", "employee"),
      allowNull: false,
    },
    senderUserId: {
      // Corrected to DataTypes.UUID to match User model's id
      type: DataTypes.UUID,
      allowNull: true, // Allow system-sent invitations or if sender isn\'t tracked
      references: {
        model: "users", // Corrected table name to lowercase plural
        key: "id",
      },
    },
    recipientUserId: {
      // User ID of the recipient after accepting the invitation
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
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
    tableName: "invitations", // Corrected table name to lowercase plural
    timestamps: true,
    indexes: [
      {
        fields: ["invitationId"],
        unique: true, // Ensure invitationId is unique index
      },
      {
        fields: ["senderUserId"], // Add index for foreign key
      },
      {
        fields: ["recipientUserId"], // Add index for recipient user id
      },
      {
        fields: ["targetEmail"], // Add index for frequent lookups
      },
      {
        fields: ["status"], // Add index for status lookups
      },
    ],
  },
);

export { Invitation };
