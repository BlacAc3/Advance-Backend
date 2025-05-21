import { User, UserRole } from './User';
import { Employer } from './Employer';
import { Employee } from './Employee';
import { Advance, AdvanceStatus } from './Advance';
import { LiquidityPool, PoolTransactionType } from './LiquidityPool';

// Define model associations
User.hasOne(Employer, {
  foreignKey: 'userId',
  as: 'employer',
});

User.hasOne(Employee, {
  foreignKey: 'userId',
  as: 'employee',
});

Employer.hasMany(Employee, {
  foreignKey: 'employerId',
  as: 'employees',
});

Employer.hasMany(LiquidityPool, {
  foreignKey: 'employerId',
  as: 'poolTransactions',
});

Employee.hasMany(Advance, {
  foreignKey: 'employeeId',
  as: 'advances',
});

export {
  User,
  UserRole,
  Employer,
  Employee,
  Advance,
  AdvanceStatus,
  LiquidityPool,
  PoolTransactionType,
}; 