import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Invitation } from "./Invitation";
import { User } from "./User";

class Marketer extends Model {
  public id!: number;
  public userId!: string;
  public registrationDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public user?: User;
}

Marketer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "marketers",
    timestamps: true,
  },
);

export { Marketer };
