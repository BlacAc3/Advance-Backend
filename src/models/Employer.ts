import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./User";
import { Marketer } from "./Marketer";

export class Employer extends Model {
  public id!: string;
  public userId!: string;
  public companyName!: string;
  // public companyId!: string;
  public registrationDate!: Date;
  public isVerified!: boolean;
  public verificationDate?: Date;
  public verifiedBy?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly user?: User;
  public readonly marketerId?: Marketer;
}

Employer.init(
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verificationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    verifiedBy: {
      type: DataTypes.STRING(42),
      allowNull: true,
      validate: {
        isEthereumAddress(value: string) {
          if (value && !/^0x[a-fA-F0-9]{40}$/.test(value)) {
            throw new Error("Invalid Ethereum address");
          }
        },
      },
    },
  },
  {
    sequelize,
    tableName: "employers",
    timestamps: true,
    indexes: [
      {
        fields: ["companyName", "userId"],
      },
    ],
  },
);

// Define associations
