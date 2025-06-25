import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./User";
import { Employer } from "./Employer";

// Define ENUMS for KYC stages and status for type safety and database constraints
export enum KycStage {
  NONE = "none", // No KYC initiated or completed
  LEVEL_1 = "level_1", // Basic verification (e.g., email, phone)
  LEVEL_2 = "level_2", // Identity verification (e.g., ID document)
  FULL = "full", // Full verification (e.g., identity + address)
}

export enum KycStatus {
  PENDING = "pending", // Verification process started, awaiting submission/review
  SUBMITTED = "submitted", // User has submitted documents/info
  IN_REVIEW = "in_review", // Reviewer is processing the submission
  APPROVED = "approved", // Stage successfully approved
  REJECTED = "rejected", // Submission rejected
  NEEDS_INFO = "needs_info", // Reviewer requires more information
  EXPIRED = "expired", // Verification stage/submission expired (if applicable)
}

export class Employee extends Model {
  public id!: string;
  public userId!: number;
  public employerId!: number;
  public registrationDate!: Date;

  // KYC Verification Fields (Modular concept: ideally these would be in a separate KycVerification model linked to User)
  public kycStage!: KycStage; // Current KYC stage achieved
  public kycStatus!: KycStatus; // Status of the current KYC process
  public kycSubmittedAt?: Date; // Timestamp when verification info was submitted
  public kycReviewedAt?: Date; // Timestamp when verification was last reviewed
  public kycReviewerId?: number; // User ID of the reviewer
  public kycNotes?: string; // Optional notes from the reviewer

  public salary?: bigint;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly user?: User;
  public readonly employer?: Employer;
  public readonly kycReviewer?: User; // Association to the user who reviewed the KYC
}

Employee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    userId: {
      // This references the User model's primary key.
      // Since the User model uses DataTypes.UUID for its id,
      // this foreign key should also be DataTypes.UUID to match.
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    employerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "employers",
        key: "id",
      },
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // KYC Verification Fields (Directly on Employee model for this example, see class comment)
    kycStage: {
      type: DataTypes.ENUM(...Object.values(KycStage)),
      allowNull: false,
      defaultValue: KycStage.NONE,
    },
    kycStatus: {
      type: DataTypes.ENUM(...Object.values(KycStatus)),
      allowNull: false,
      defaultValue: KycStatus.PENDING,
    },
    kycSubmittedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    kycReviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    kycReviewerId: {
      // This references the User model's primary key (as the reviewer is a User).
      // Since the User model uses DataTypes.UUID for its id,
      // this foreign key should ideally also be DataTypes.UUID to match for consistency.
      type: DataTypes.UUID,
      allowNull: true, // Reviewer is optional
      references: {
        model: "users", // Assuming reviewer is also a user in the system
        key: "id",
      },
    },
    kycNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Original salary field remains
    salary: {
      type: DataTypes.DECIMAL(20, 0), // For storing large numbers (wei)
      allowNull: true,
    },
    // The original isVerified, verificationDate, verifiedBy fields are removed
    // as they are now covered by kycStage, kycStatus, etc.
  },
  {
    sequelize,
    tableName: "employees",
    timestamps: true,
  },
);
