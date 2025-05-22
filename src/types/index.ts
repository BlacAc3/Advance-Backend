export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYER = 'EMPLOYER',
  EMPLOYEE = 'EMPLOYEE',
  WEB3_USER = 'WEB3_USER'
}

export interface TokenPayload {
  id: string;
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
  createdAt?: Date;
  updatedAt?: Date;
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

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
} 