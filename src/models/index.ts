import { User } from "./User";
import { UserRole } from "../types";
import { Employer } from "./Employer";
import { Employee } from "./Employee";
import { Advance, AdvanceStatus } from "./Advance";
import { LiquidityPool, PoolTransactionType } from "./LiquidityPool";
import { Invitation } from "./Invitation";

// NOTE: Ensure foreign key types match the primary key types they reference.
// For example, foreign keys referencing User.id (UUID) or Employee.id (UUID)
// should use DataTypes.UUID, not DataTypes.INTEGER, to maintain data integrity.

// Define model associations
User.hasOne(Employer, {
  foreignKey: "userId",
  as: "employer",
});

User.hasOne(Employee, {
  foreignKey: "userId",
  as: "employee",
});

Employer.hasMany(Employee, {
  foreignKey: "employerId",
  as: "employees",
});

Employer.hasMany(LiquidityPool, {
  foreignKey: "employerId",
  as: "poolTransactions",
});

Employee.hasMany(Advance, {
  foreignKey: "employeeId",
  as: "advances",
});

Invitation.belongsTo(User, {
  foreignKey: "sentByUserId",
  as: "sentBy",
});

Employer.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Employee.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Employee.belongsTo(Employer, {
  foreignKey: "employerId",
  as: "employer",
});

Employee.belongsTo(User, {
  foreignKey: "kycReviewerId",
  as: "kycReviewer",
});

Advance.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

LiquidityPool.belongsTo(Employer, {
  foreignKey: "employerId",
  as: "employer",
});

export {
  User,
  UserRole,
  Employer,
  Employee,
  Advance,
  AdvanceStatus,
  Invitation,
  LiquidityPool,
  PoolTransactionType,
};
