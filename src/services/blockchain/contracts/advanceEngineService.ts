import { ethers, Log } from 'ethers';
import { BaseContractService } from './baseContractService';
import { contractAddresses } from '../blockchainService';
import { logger } from '../../../utils/logger';

// Import ABI from your contracts
const AdvanceEngineABI = [
  // Advance Management
  "function requestAdvance(uint256 amount, uint256 repaymentDate) returns (uint256)",
  "function approveAdvance(uint256 advanceId) returns (bool)",
  "function rejectAdvance(uint256 advanceId) returns (bool)",
  "function repayAdvance(uint256 advanceId) returns (bool)",
  "function getAdvanceDetails(uint256 advanceId) view returns (address employee, uint256 amount, uint256 repaymentDate, uint256 status, uint256 requestDate)",
  "function getEmployeeAdvances(address employee) view returns (uint256[])",
  "function getEmployerAdvances(address employer) view returns (uint256[])",
  "function calculateAdvanceFee(uint256 amount, uint256 duration) view returns (uint256)",
  
  // Events
  "event AdvanceRequested(uint256 indexed advanceId, address indexed employee, address indexed employer, uint256 amount, uint256 repaymentDate, uint256 requestDate)",
  "event AdvanceApproved(uint256 indexed advanceId, address indexed approver, uint256 approvalDate)",
  "event AdvanceRejected(uint256 indexed advanceId, address indexed rejector, uint256 rejectionDate)",
  "event AdvanceRepaid(uint256 indexed advanceId, address indexed repayer, uint256 repaymentDate)",
  
  // Constants
  "function MAX_ADVANCE_AMOUNT() view returns (uint256)",
  "function MIN_ADVANCE_AMOUNT() view returns (uint256)",
  "function MAX_REPAYMENT_PERIOD() view returns (uint256)",
  "function ADVANCE_FEE_PERCENTAGE() view returns (uint256)"
];

export enum AdvanceStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
  REPAID = 3,
  DEFAULTED = 4
}

export interface AdvanceDetails {
  employee: string;
  amount: bigint;
  repaymentDate: Date;
  status: AdvanceStatus;
  requestDate: Date;
}

export class AdvanceEngineService extends BaseContractService {
  private static instance: AdvanceEngineService;

  private constructor(privateKey?: string) {
    super(
      contractAddresses.advanceEngine,
      AdvanceEngineABI,
      !!privateKey,
      privateKey
    );
  }

  public static getInstance(privateKey?: string): AdvanceEngineService {
    if (!AdvanceEngineService.instance) {
      AdvanceEngineService.instance = new AdvanceEngineService(privateKey);
    }
    return AdvanceEngineService.instance;
  }

  // Advance Management
  async requestAdvance(
    amount: bigint,
    repaymentDate: Date
  ): Promise<{ advanceId: number; receipt: ethers.TransactionReceipt }> {
    try {
      const tx = await this.contract.requestAdvance(
        amount,
        Math.floor(repaymentDate.getTime() / 1000)
      );
      const receipt = await this.waitForTransaction(tx.hash);
      
      // Get the advance ID from the event
      const event = receipt.logs
        .filter((log: Log) => {
          try {
            return this.contract.interface.parseLog(log)?.name === 'AdvanceRequested';
          } catch {
            return false;
          }
        })
        .map(log => this.contract.interface.parseLog(log))[0];
      
      const advanceId = Number(event?.args[0]);
      return { advanceId, receipt };
    } catch (error) {
      logger.error('Failed to request advance:', error);
      throw new Error(this.formatError(error));
    }
  }

  async approveAdvance(advanceId: number): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.approveAdvance(advanceId);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to approve advance:', error);
      throw new Error(this.formatError(error));
    }
  }

  async rejectAdvance(advanceId: number): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.rejectAdvance(advanceId);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to reject advance:', error);
      throw new Error(this.formatError(error));
    }
  }

  async repayAdvance(advanceId: number): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.repayAdvance(advanceId);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to repay advance:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Advance Queries
  async getAdvanceDetails(advanceId: number): Promise<AdvanceDetails> {
    try {
      const [employee, amount, repaymentDate, status, requestDate] = 
        await this.contract.getAdvanceDetails(advanceId);
      
      return {
        employee,
        amount,
        repaymentDate: new Date(Number(repaymentDate) * 1000),
        status: Number(status) as AdvanceStatus,
        requestDate: new Date(Number(requestDate) * 1000)
      };
    } catch (error) {
      logger.error('Failed to get advance details:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getEmployeeAdvances(employeeAddress: string): Promise<number[]> {
    try {
      const advances = await this.contract.getEmployeeAdvances(employeeAddress);
      return advances.map((advance: bigint) => Number(advance));
    } catch (error) {
      logger.error('Failed to get employee advances:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getEmployerAdvances(employerAddress: string): Promise<number[]> {
    try {
      const advances = await this.contract.getEmployerAdvances(employerAddress);
      return advances.map((advance: bigint) => Number(advance));
    } catch (error) {
      logger.error('Failed to get employer advances:', error);
      throw new Error(this.formatError(error));
    }
  }

  async calculateAdvanceFee(amount: bigint, duration: number): Promise<bigint> {
    try {
      return await this.contract.calculateAdvanceFee(amount, duration);
    } catch (error) {
      logger.error('Failed to calculate advance fee:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Constants
  async getConstants(): Promise<{
    maxAdvanceAmount: bigint;
    minAdvanceAmount: bigint;
    maxRepaymentPeriod: number;
    advanceFeePercentage: number;
  }> {
    try {
      const [
        maxAdvanceAmount,
        minAdvanceAmount,
        maxRepaymentPeriod,
        advanceFeePercentage
      ] = await Promise.all([
        this.contract.MAX_ADVANCE_AMOUNT(),
        this.contract.MIN_ADVANCE_AMOUNT(),
        this.contract.MAX_REPAYMENT_PERIOD(),
        this.contract.ADVANCE_FEE_PERCENTAGE()
      ]);

      return {
        maxAdvanceAmount,
        minAdvanceAmount,
        maxRepaymentPeriod: Number(maxRepaymentPeriod),
        advanceFeePercentage: Number(advanceFeePercentage)
      };
    } catch (error) {
      logger.error('Failed to get contract constants:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Event Listeners
  async onAdvanceRequested(
    callback: (employee: string, amount: bigint, dueDate: Date, requestId: bigint) => void
  ): Promise<void> {
    await this.logContractEvents('AdvanceRequested', (event) => {
      const [employee, amount, dueDate, requestId] = event.args || [];
      callback(
        employee,
        amount,
        new Date(Number(dueDate) * 1000),
        requestId
      );
    });
  }

  async onAdvanceApproved(
    callback: (employee: string, amount: bigint, dueDate: Date, requestId: bigint) => void
  ): Promise<void> {
    await this.logContractEvents('AdvanceApproved', (event) => {
      const [employee, amount, dueDate, requestId] = event.args || [];
      callback(
        employee,
        amount,
        new Date(Number(dueDate) * 1000),
        requestId
      );
    });
  }

  async onAdvanceRepaid(
    callback: (employee: string, amount: bigint, requestId: bigint) => void
  ): Promise<void> {
    await this.logContractEvents('AdvanceRepaid', (event) => {
      const [employee, amount, requestId] = event.args || [];
      callback(
        employee,
        amount,
        requestId
      );
    });
  }
} 