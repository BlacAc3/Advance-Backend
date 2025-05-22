import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface DemoRequestAttributes {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  companySize: number;
  message?: string;
  status: 'PENDING' | 'CONTACTED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  scheduledDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class DemoRequest extends Model<DemoRequestAttributes> implements DemoRequestAttributes {
  public id!: number;
  public companyName!: string;
  public contactName!: string;
  public email!: string;
  public phone!: string;
  public companySize!: number;
  public message?: string;
  public status!: 'PENDING' | 'CONTACTED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
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
      type: DataTypes.ENUM('PENDING', 'CONTACTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED'),
      allowNull: false,
      defaultValue: 'PENDING',
    },
    scheduledDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'demo_requests',
    timestamps: true,
  }
); 