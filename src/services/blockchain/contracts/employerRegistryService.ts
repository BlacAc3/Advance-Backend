import { ethers } from 'ethers';
import { BaseContractService } from './baseContractService';
import { contractAddresses } from '../blockchainService';
import { logger } from '../../../utils/logger';

// Import ABI from your contracts
const EmployerRegistryABI = [
  // Employer Management
  "function registerEmployer(string memory companyName, string memory companyId) returns (bool)",
  "function updateEmployerDetails(string memory companyName, string memory companyId)",
  "function verifyEmployer(address employerAddress) returns (bool)",
  "function isEmployerVerified(address employerAddress) view returns (bool)",
  "function getEmployerDetails(address employerAddress) view returns (string memory companyName, string memory companyId, bool isVerified, uint256 registrationDate)",
  "function getEmployerCount() view returns (uint256)",
  "function getEmployerByIndex(uint256 index) view returns (address)",
  
  // Events
  "event EmployerRegistered(address indexed employer, string companyName, string companyId, uint256 timestamp)",
  "event EmployerVerified(address indexed employer, address indexed verifier, uint256 timestamp)",
  "event EmployerDetailsUpdated(address indexed employer, string companyName, string companyId, uint256 timestamp)"
];

export interface EmployerDetails {
  companyName: string;
  companyId: string;
  isVerified: boolean;
  registrationDate: Date;
}

export class EmployerRegistryService extends BaseContractService {
  private static instance: EmployerRegistryService;

  private constructor(privateKey?: string) {
    super(
      contractAddresses.employerRegistry,
      EmployerRegistryABI,
      !!privateKey,
      privateKey
    );
  }

  public static getInstance(privateKey?: string): EmployerRegistryService {
    if (!EmployerRegistryService.instance) {
      EmployerRegistryService.instance = new EmployerRegistryService(privateKey);
    }
    return EmployerRegistryService.instance;
  }

  // Employer Registration
  async registerEmployer(
    companyName: string,
    companyId: string
  ): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.registerEmployer(companyName, companyId);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to register employer:', error);
      throw new Error(this.formatError(error));
    }
  }

  async updateEmployerDetails(
    companyName: string,
    companyId: string
  ): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.updateEmployerDetails(companyName, companyId);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to update employer details:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Employer Verification
  async verifyEmployer(employerAddress: string): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.verifyEmployer(employerAddress);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to verify employer:', error);
      throw new Error(this.formatError(error));
    }
  }

  async isEmployerVerified(employerAddress: string): Promise<boolean> {
    try {
      return await this.contract.isEmployerVerified(employerAddress);
    } catch (error) {
      logger.error('Failed to check employer verification:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Employer Queries
  async getEmployerDetails(employerAddress: string): Promise<EmployerDetails> {
    try {
      const [companyName, companyId, isVerified, registrationDate] = 
        await this.contract.getEmployerDetails(employerAddress);
      
      return {
        companyName,
        companyId,
        isVerified,
        registrationDate: new Date(Number(registrationDate) * 1000)
      };
    } catch (error) {
      logger.error('Failed to get employer details:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getEmployerCount(): Promise<number> {
    try {
      const count = await this.contract.getEmployerCount();
      return Number(count);
    } catch (error) {
      logger.error('Failed to get employer count:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getEmployerByIndex(index: number): Promise<string> {
    try {
      return await this.contract.getEmployerByIndex(index);
    } catch (error) {
      logger.error('Failed to get employer by index:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Event Listeners
  async onEmployerRegistered(
    callback: (employer: string, companyName: string, companyId: string, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('EmployerRegistered', (event) => {
      const [employer, companyName, companyId, timestamp] = event.args || [];
      callback(
        employer,
        companyName,
        companyId,
        new Date(Number(timestamp) * 1000)
      );
    });
  }

  async onEmployerVerified(
    callback: (employer: string, verifier: string, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('EmployerVerified', (event) => {
      const [employer, verifier, timestamp] = event.args || [];
      callback(
        employer,
        verifier,
        new Date(Number(timestamp) * 1000)
      );
    });
  }

  async onEmployerDetailsUpdated(
    callback: (employer: string, companyName: string, companyId: string, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('EmployerDetailsUpdated', (event) => {
      const [employer, companyName, companyId, timestamp] = event.args || [];
      callback(
        employer,
        companyName,
        companyId,
        new Date(Number(timestamp) * 1000)
      );
    });
  }
} 