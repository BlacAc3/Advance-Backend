import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./User";

export class Employer extends Model {
  public id!: number;
  public userId!: number;
  public companyName!: string;
  public companyId!: string;
  public registrationDate!: Date;
  public isVerified!: boolean;
  public verificationDate?: Date;
  public verifiedBy?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly user?: User;
}

Employer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
  },
);

// Define associations
