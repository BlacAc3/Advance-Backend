import { ethers, EventLog } from 'ethers';
import { BaseContractService } from './baseContractService';
import { contractAddresses } from '../blockchainService';
import { logger } from '../../../utils/logger';

// Import ABI from your contracts
const AccessControlManagerABI = [
  // Role Management
  "function hasRole(bytes32 role, address account) view returns (bool)",
  "function getRoleAdmin(bytes32 role) view returns (bytes32)",
  "function grantRole(bytes32 role, address account)",
  "function revokeRole(bytes32 role, address account)",
  "function renounceRole(bytes32 role, address account)",
  
  // Role Events
  "event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)",
  "event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)",
  
  // Role Constants
  "function DEFAULT_ADMIN_ROLE() view returns (bytes32)",
  "function ADMIN_ROLE() view returns (bytes32)",
  "function EMPLOYER_ROLE() view returns (bytes32)",
  "function EMPLOYEE_ROLE() view returns (bytes32)",
  "function LIQUIDITY_PROVIDER_ROLE() view returns (bytes32)"
];

export class AccessControlService extends BaseContractService {
  private static instance: AccessControlService;

  private constructor(privateKey?: string) {
    super(
      contractAddresses.accessControlManager,
      AccessControlManagerABI,
      !!privateKey,
      privateKey
    );
  }

  public static getInstance(privateKey?: string): AccessControlService {
    if (!AccessControlService.instance) {
      AccessControlService.instance = new AccessControlService(privateKey);
    }
    return AccessControlService.instance;
  }

  // Role Management Methods
  async hasRole(role: string, account: string): Promise<boolean> {
    try {
      return await this.contract.hasRole(role, account);
    } catch (error) {
      logger.error('Failed to check role:', error);
      throw new Error(this.formatError(error));
    }
  }

  async grantRole(role: string, account: string): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.grantRole(role, account);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to grant role:', error);
      throw new Error(this.formatError(error));
    }
  }

  async revokeRole(role: string, account: string): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.revokeRole(role, account);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to revoke role:', error);
      throw new Error(this.formatError(error));
    }
  }

  async renounceRole(role: string, account: string): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.renounceRole(role, account);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to renounce role:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Role Constants
  async getRoleConstants(): Promise<{
    DEFAULT_ADMIN_ROLE: string;
    ADMIN_ROLE: string;
    EMPLOYER_ROLE: string;
    EMPLOYEE_ROLE: string;
    LIQUIDITY_PROVIDER_ROLE: string;
  }> {
    try {
      const [
        DEFAULT_ADMIN_ROLE,
        ADMIN_ROLE,
        EMPLOYER_ROLE,
        EMPLOYEE_ROLE,
        LIQUIDITY_PROVIDER_ROLE
      ] = await Promise.all([
        this.contract.DEFAULT_ADMIN_ROLE(),
        this.contract.ADMIN_ROLE(),
        this.contract.EMPLOYER_ROLE(),
        this.contract.EMPLOYEE_ROLE(),
        this.contract.LIQUIDITY_PROVIDER_ROLE()
      ]);

      return {
        DEFAULT_ADMIN_ROLE,
        ADMIN_ROLE,
        EMPLOYER_ROLE,
        EMPLOYEE_ROLE,
        LIQUIDITY_PROVIDER_ROLE
      };
    } catch (error) {
      logger.error('Failed to get role constants:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Event Listeners
  async onRoleGranted(
    callback: (role: string, account: string, sender: string, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('RoleGranted', (event: EventLog) => {
      const [role, account, sender, timestamp] = event.args || [];
      callback(
        role,
        account,
        sender,
        new Date(Number(timestamp) * 1000)
      );
    });
  }

  async onRoleRevoked(
    callback: (role: string, account: string, sender: string, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('RoleRevoked', (event: EventLog) => {
      const [role, account, sender, timestamp] = event.args || [];
      callback(
        role,
        account,
        sender,
        new Date(Number(timestamp) * 1000)
      );
    });
  }
} 