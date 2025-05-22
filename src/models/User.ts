import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYER = 'EMPLOYER',
  EMPLOYEE = 'EMPLOYEE',
}

interface UserAttributes {
  id: string;
  email: string;
  password: string;
  role: string;
  walletAddress?: string;
  walletData?: {
    privateKey: string;
    address: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public walletAddress?: string;
  public walletData?: {
    privateKey: string;
    address: string;
  };
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Instance methods
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public async hashPassword(): Promise<void> {
    if (this.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USER',
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^0x[a-fA-F0-9]{40}$/,
      },
    },
    walletData: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeSave: async (user: User) => {
        await user.hashPassword();
      },
    },
    indexes: [
      {
        fields: ['email'],
        unique: true,
      },
      {
        fields: ['walletAddress'],
        unique: true,
      },
      {
        fields: ['role'],
      },
    ],
  }
);

export { User, UserAttributes }; 