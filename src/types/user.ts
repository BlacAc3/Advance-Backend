export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYER = 'EMPLOYER',
  EMPLOYEE = 'EMPLOYEE',
  LIQUIDITY_PROVIDER = 'LIQUIDITY_PROVIDER'
}

export interface UserProfile {
  id: number;
  walletAddress: string;
  role: UserRole;
  email: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  walletAddress: string;
  role: UserRole;
  email: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateUserDto {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  isVerified?: boolean;
  isActive?: boolean;
} 