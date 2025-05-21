import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { Employer } from './Employer';

export class Employee extends Model {
  public id!: number;
  public userId!: number;
  public employerId!: number;
  public employeeId!: string;
  public registrationDate!: Date;
  public isVerified!: boolean;
  public verificationDate?: Date;
  public verifiedBy?: string;
  public salary?: bigint;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly user?: User;
  public readonly employer?: Employer;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employers',
        key: 'id',
      },
    },
    employeeId: {
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
            throw new Error('Invalid Ethereum address');
          }
        },
      },
    },
    salary: {
      type: DataTypes.DECIMAL(20, 0), // For storing large numbers (wei)
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'employees',
    timestamps: true,
  }
);

// Define associations
Employee.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Employee.belongsTo(Employer, {
  foreignKey: 'employerId',
  as: 'employer',
}); 