import { ethers } from 'ethers';
import { BaseContractService } from './baseContractService';
import { contractAddresses } from '../blockchainService';
import { logger } from '../../../utils/logger';

// Import ABI from your contracts
const EmployeeRegistryABI = [
  // Employee Management
  "function registerEmployee(string memory employeeId, address employerAddress) returns (bool)",
  "function updateEmployeeDetails(string memory employeeId, address employerAddress)",
  "function verifyEmployee(address employeeAddress) returns (bool)",
  "function isEmployeeVerified(address employeeAddress) view returns (bool)",
  "function getEmployeeDetails(address employeeAddress) view returns (string memory employeeId, address employerAddress, bool isVerified, uint256 registrationDate)",
  "function getEmployeeCount() view returns (uint256)",
  "function getEmployeeByIndex(uint256 index) view returns (address)",
  "function getEmployeesByEmployer(address employerAddress) view returns (address[])",
  
  // Events
  "event EmployeeRegistered(address indexed employee, string employeeId, address indexed employer, uint256 timestamp)",
  "event EmployeeVerified(address indexed employee, address indexed verifier, uint256 timestamp)",
  "event EmployeeDetailsUpdated(address indexed employee, string employeeId, address indexed employer, uint256 timestamp)"
];

export interface EmployeeDetails {
  employeeId: string;
  employerAddress: string;
  isVerified: boolean;
  registrationDate: Date;
}

export class EmployeeRegistryService extends BaseContractService {
  private static instance: EmployeeRegistryService;

  private constructor(privateKey?: string) {
    super(
      contractAddresses.employeeRegistry,
      EmployeeRegistryABI,
      !!privateKey,
      privateKey
    );
  }

  public static getInstance(privateKey?: string): EmployeeRegistryService {
    if (!EmployeeRegistryService.instance) {
      EmployeeRegistryService.instance = new EmployeeRegistryService(privateKey);
    }
    return EmployeeRegistryService.instance;
  }

  // Employee Registration
  async registerEmployee(
    employeeId: string,
    employerAddress: string
  ): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.registerEmployee(employeeId, employerAddress);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to register employee:', error);
      throw new Error(this.formatError(error));
    }
  }

  async updateEmployeeDetails(
    employeeId: string,
    employerAddress: string
  ): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.updateEmployeeDetails(employeeId, employerAddress);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to update employee details:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Employee Verification
  async verifyEmployee(employeeAddress: string): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.verifyEmployee(employeeAddress);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to verify employee:', error);
      throw new Error(this.formatError(error));
    }
  }

  async isEmployeeVerified(employeeAddress: string): Promise<boolean> {
    try {
      return await this.contract.isEmployeeVerified(employeeAddress);
    } catch (error) {
      logger.error('Failed to check employee verification:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Employee Queries
  async getEmployeeDetails(employeeAddress: string): Promise<EmployeeDetails> {
    try {
      const [employeeId, employerAddress, isVerified, registrationDate] = 
        await this.contract.getEmployeeDetails(employeeAddress);
      
      return {
        employeeId,
        employerAddress,
        isVerified,
        registrationDate: new Date(Number(registrationDate) * 1000)
      };
    } catch (error) {
      logger.error('Failed to get employee details:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getEmployeeCount(): Promise<number> {
    try {
      const count = await this.contract.getEmployeeCount();
      return Number(count);
    } catch (error) {
      logger.error('Failed to get employee count:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getEmployeeByIndex(index: number): Promise<string> {
    try {
      return await this.contract.getEmployeeByIndex(index);
    } catch (error) {
      logger.error('Failed to get employee by index:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getEmployeesByEmployer(employerAddress: string): Promise<string[]> {
    try {
      return await this.contract.getEmployeesByEmployer(employerAddress);
    } catch (error) {
      logger.error('Failed to get employees by employer:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Event Listeners
  async onEmployeeRegistered(
    callback: (employee: string, employer: string, employeeId: string, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('EmployeeRegistered', (event) => {
      const [employee, employer, employeeId, timestamp] = event.args || [];
      callback(
        employee,
        employer,
        employeeId,
        new Date(Number(timestamp) * 1000)
      );
    });
  }

  async onEmployeeVerified(
    callback: (employee: string, verifier: string, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('EmployeeVerified', (event) => {
      const [employee, verifier, timestamp] = event.args || [];
      callback(
        employee,
        verifier,
        new Date(Number(timestamp) * 1000)
      );
    });
  }

  async onEmployeeDetailsUpdated(
    callback: (employee: string, employer: string, employeeId: string, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('EmployeeDetailsUpdated', (event) => {
      const [employee, employer, employeeId, timestamp] = event.args || [];
      callback(
        employee,
        employer,
        employeeId,
        new Date(Number(timestamp) * 1000)
      );
    });
  }
} 