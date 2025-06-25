import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/database";
import bcrypt from "bcryptjs";
import { UserRole, UserAttributes, CreateUserAttributes } from "../types";

class User
  extends Model<UserAttributes, CreateUserAttributes>
  implements UserAttributes
{
  public id!: string;
  public username?: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public walletAddress?: string;
  public walletData?: {
    privateKey: string;
    address: string;
  };
  public isActive!: boolean;
  public isWalletVerified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Instance methods
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public async hashPassword(): Promise<void> {
    if (this.changed("password")) {
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
      // Using UUID as a primary key means that relationships referencing this
      // model (e.g., userId in Employee or Employer) should also use
      // DataTypes.UUID instead of DataTypes.INTEGER to maintain data integrity.
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      defaultValue: null,
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
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.WEB3_USER,
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        is: /^0x[a-fA-F0-9]{40}$/,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isWalletVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
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
    modelName: "User",
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeSave: async (user: User) => {
        await user.hashPassword();
      },
    },
    indexes: [
      {
        fields: ["email"],
        unique: true,
      },
      {
        fields: ["walletAddress"],
        unique: true,
      },
      {
        fields: ["role"],
      },
    ],
  },
);

export { User };
