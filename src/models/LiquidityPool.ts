import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Employer } from "./Employer";

export enum PoolTransactionType {
  CONTRIBUTION = "CONTRIBUTION",
  WITHDRAWAL = "WITHDRAWAL",
  ADVANCE_FUNDING = "ADVANCE_FUNDING",
  REPAYMENT = "REPAYMENT",
}

export class LiquidityPool extends Model {
  public id!: number;
  public employerId!: number;
  public amount!: bigint;
  public transactionType!: PoolTransactionType;
  public transactionHash!: string;
  public timestamp!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly employer?: Employer;
}

LiquidityPool.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employers",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(20, 0), // For storing large numbers (wei)
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.ENUM(...Object.values(PoolTransactionType)),
      allowNull: false,
    },
    transactionHash: {
      type: DataTypes.STRING(66),
      allowNull: false,
      validate: {
        isTransactionHash(value: string) {
          if (!/^0x[a-fA-F0-9]{64}$/.test(value)) {
            throw new Error("Invalid transaction hash");
          }
        },
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "liquidity_pool",
    timestamps: true,
    indexes: [
      {
        fields: ["employerId"],
      },
      {
        fields: ["transactionType"],
      },
      {
        fields: ["timestamp"],
      },
      {
        fields: ["transactionHash"],
        unique: true,
      },
    ],
  },
);

// Define associations
