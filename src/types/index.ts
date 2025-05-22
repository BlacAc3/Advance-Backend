import { Request } from 'express';

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYER = 'EMPLOYER',
  EMPLOYEE = 'EMPLOYEE',
  WEB3_USER = 'WEB3_USER',
  REGULAR_USER = 'REGULAR_USER'
}

export interface TokenPayload {
  userId: string;
  role: UserRole;
  walletAddress?: string;
}

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  walletAddress?: string;
  isActive: boolean;
  isWalletVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployerAttributes {
  id: string;
  userId: string;
  companyName: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verificationDocuments?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EmployeeAttributes {
  id: string;
  userId: string;
  employerId: string;
  position: string;
  salary: number;
  startDate: Date;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdvanceRequestAttributes {
  id: string;
  employeeId: string;
  amount: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID' | 'REPAID';
  approvedAt?: Date;
  paidAt?: Date;
  repaidAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DemoRequestAttributes {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  companySize: string;
  industry: string;
  message: string;
  status: 'PENDING' | 'CONTACTED' | 'CONVERTED' | 'REJECTED';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStakingContract {
  address: string;
  stake(amount: string): Promise<any>;
  unstake(amount: string): Promise<any>;
  claimRewards(): Promise<any>;
  getStakedBalance(address: string): Promise<string>;
  getRewards(address: string): Promise<string>;
  getTotalStaked(): Promise<string>;
  getTotalRewards(): Promise<string>;
}

export type CreateUserAttributes = Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export interface UserResponse {
  id: string;
  email: string;
  role: UserRole;
  walletAddress?: string;
  isWalletVerified: boolean;
}

// Extend Express Request type
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Request {
      user?: TokenPayload;
    }
  }
}

// Ensure type compatibility for authenticated requests
export type AuthenticatedRequest = Omit<Request, 'user'> & {
  user: TokenPayload;
}; 