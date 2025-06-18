import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Employee } from "./Employee";

export enum AdvanceStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PAID = "PAID",
  REPAID = "REPAID",
  DEFAULTED = "DEFAULTED",
}

export class Advance extends Model {
  public id!: string;
  public employeeId!: string;
  public amount!: bigint;
  public repaymentAmount!: bigint;
  public requestDate!: Date;
  public approvalDate?: Date;
  public paymentDate?: Date;
  public dueDate!: Date;
  public status!: AdvanceStatus;
  public transactionHash?: string;
  public repaymentTransactionHash?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly employee?: Employee;
}

Advance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(20, 0), // For storing large numbers (wei)
      allowNull: false,
    },
    repaymentAmount: {
      type: DataTypes.DECIMAL(20, 0), // For storing large numbers (wei)
      allowNull: false,
    },
    requestDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    approvalDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(AdvanceStatus)),
      allowNull: false,
      defaultValue: AdvanceStatus.PENDING,
    },
    transactionHash: {
      type: DataTypes.STRING(66),
      allowNull: true,
      validate: {
        isTransactionHash(value: string) {
          if (value && !/^0x[a-fA-F0-9]{64}$/.test(value)) {
            throw new Error("Invalid transaction hash");
          }
        },
      },
    },
    repaymentTransactionHash: {
      type: DataTypes.STRING(66),
      allowNull: true,
      validate: {
        isTransactionHash(value: string) {
          if (value && !/^0x[a-fA-F0-9]{64}$/.test(value)) {
            throw new Error("Invalid transaction hash");
          }
        },
      },
    },
  },
  {
    sequelize,
    tableName: "advances",
    timestamps: true,
    indexes: [
      {
        fields: ["employeeId"],
      },
      {
        fields: ["status"],
      },
      {
        fields: ["dueDate"],
      },
    ],
  },
);
