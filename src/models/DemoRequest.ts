import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface DemoRequestAttributes {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  companySize: number;
  message?: string;
  status: "PENDING" | "CONTACTED" | "SCHEDULED" | "COMPLETED" | "CANCELLED";
  scheduledDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define CreationAttributes by omitting the auto-generated/timestamped fields
// This is good practice, although not strictly required by the specific error
// shown, it helps with type safety when creating new records.
interface DemoRequestCreationAttributes
  extends Optional<DemoRequestAttributes, "id" | "createdAt" | "updatedAt"> {}

// Update the class definition to include CreationAttributes as the second type parameter
export class DemoRequest
  extends Model<DemoRequestAttributes, DemoRequestCreationAttributes>
  implements DemoRequestAttributes
{
  public id!: number;
  public companyName!: string;
  public contactName!: string;
  public email!: string;
  public phone!: string;
  public companySize!: number;
  public message?: string;
  public status!:
    | "PENDING"
    | "CONTACTED"
    | "SCHEDULED"
    | "COMPLETED"
    | "CANCELLED";
  public scheduledDate?: Date;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DemoRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    companySize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "CONTACTED",
        "SCHEDULED",
        "COMPLETED",
        "CANCELLED",
      ),
      allowNull: false,
      defaultValue: "PENDING",
    },
    scheduledDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Add createdAt and updatedAt definitions here to satisfy the type expectations
    // when timestamps: true is used. Sequelize will manage these columns.
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "demo_requests",
    timestamps: true, // This tells Sequelize to automatically manage createdAt and updatedAt
  },
);
