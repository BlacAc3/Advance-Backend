import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./User"; // Assuming User model exists and invitations can be sent by Users
import { UserRole } from "../types";
import { Employee } from "../models/Employee";

class Invitation extends Model {
  public id!: string; // Changed id to string (UUID)
  public invitationId!: string; // Unique ID for the invitation link/code
  // Removed target as it's not a direct column
  public targetEmail!: string; //Email invitation is sent to
  public sentByUserId!: string; // Corrected sentByUserId to string (UUID)
  public expiresAt!: Date; // Expiration date for the invitation
  public status!: "pending" | "accepted" | "rejected" | "expired"; // Status of the invitation
  public role!: "employer" | "employee"; // Added role based on init definition

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly sentBy?: User;
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
    invitationId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    role: {
      // Changed to enum of strings to match model definition
      type: DataTypes.ENUM("employer", "employee"),
      allowNull: false,
    },
    sentByUserId: {
      // Corrected to DataTypes.UUID to match User model's id
      type: DataTypes.UUID,
      allowNull: true, // Allow system-sent invitations or if sender isn\'t tracked
      references: {
        model: "users", // Corrected table name to lowercase plural
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
        fields: ["sentByUserId"], // Add index for foreign key
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
