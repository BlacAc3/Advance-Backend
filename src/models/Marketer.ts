import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Invitation } from "./Invitation";

class Marketer extends Model {
  public id!: number;
  public invitationId!: string;
  public registrationDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
}

Marketer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    invitationId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: "invitations",
        key: "id",
      },
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
