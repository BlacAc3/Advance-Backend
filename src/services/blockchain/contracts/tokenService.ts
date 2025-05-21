import { ethers } from 'ethers';
import { BaseContractService } from './baseContractService';
import { contractAddresses } from '../blockchainService';
import { logger } from '../../../utils/logger';

// Import ABI from your contracts
const TokenABI = [
  // ERC20 Standard
  "function name() view returns (string memory)",
  "function symbol() view returns (string memory)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  
  // Platform Specific
  "function mint(address to, uint256 amount) returns (bool)",
  "function burn(uint256 amount) returns (bool)",
  "function pause() returns (bool)",
  "function unpause() returns (bool)",
  "function isPaused() view returns (bool)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event Paused(address indexed account)",
  "event Unpaused(address indexed account)"
];

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
}

export class TokenService extends BaseContractService {
  private static instance: TokenService;

  private constructor(privateKey?: string) {
    super(
      contractAddresses.mockStablecoin, // Using mockStablecoin as the token contract
      TokenABI,
      !!privateKey,
      privateKey
    );
  }

  public static getInstance(privateKey?: string): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService(privateKey);
    }
    return TokenService.instance;
  }

  // Token Info
  async getTokenInfo(): Promise<TokenInfo> {
    try {
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        this.contract.name(),
        this.contract.symbol(),
        this.contract.decimals(),
        this.contract.totalSupply()
      ]);

      return {
        name,
        symbol,
        decimals: Number(decimals),
        totalSupply
      };
    } catch (error) {
      logger.error('Failed to get token info:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Balance and Allowance
  async getBalance(accountAddress: string): Promise<bigint> {
    try {
      return await this.contract.balanceOf(accountAddress);
    } catch (error) {
      logger.error('Failed to get balance:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getAllowance(ownerAddress: string, spenderAddress: string): Promise<bigint> {
    try {
      return await this.contract.allowance(ownerAddress, spenderAddress);
    } catch (error) {
      logger.error('Failed to get allowance:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Token Operations
  async transfer(toAddress: string, amount: bigint): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.transfer(toAddress, amount);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to transfer tokens:', error);
      throw new Error(this.formatError(error));
    }
  }

  async approve(spenderAddress: string, amount: bigint): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.approve(spenderAddress, amount);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to approve tokens:', error);
      throw new Error(this.formatError(error));
    }
  }

  async transferFrom(
    fromAddress: string,
    toAddress: string,
    amount: bigint
  ): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.transferFrom(fromAddress, toAddress, amount);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to transfer from:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Platform Specific Operations
  async mint(toAddress: string, amount: bigint): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.mint(toAddress, amount);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to mint tokens:', error);
      throw new Error(this.formatError(error));
    }
  }

  async burn(amount: bigint): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.burn(amount);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to burn tokens:', error);
      throw new Error(this.formatError(error));
    }
  }

  async pause(): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.pause();
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to pause token:', error);
      throw new Error(this.formatError(error));
    }
  }

  async unpause(): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.unpause();
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to unpause token:', error);
      throw new Error(this.formatError(error));
    }
  }

  async isPaused(): Promise<boolean> {
    try {
      return await this.contract.isPaused();
    } catch (error) {
      logger.error('Failed to check pause status:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Event Listeners
  async onTransfer(
    callback: (from: string, to: string, amount: bigint, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('Transfer', (event) => {
      const [from, to, amount, timestamp] = event.args || [];
      callback(
        from,
        to,
        amount,
        new Date(Number(timestamp) * 1000)
      );
    });
  }

  async onApproval(
    callback: (owner: string, spender: string, amount: bigint, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('Approval', (event) => {
      const [owner, spender, amount, timestamp] = event.args || [];
      callback(
        owner,
        spender,
        amount,
        new Date(Number(timestamp) * 1000)
      );
    });
  }

  async onMint(
    callback: (to: string, amount: bigint, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('Mint', (event) => {
      const [to, amount, timestamp] = event.args || [];
      callback(
        to,
        amount,
        new Date(Number(timestamp) * 1000)
      );
    });
  }

  async onBurn(
    callback: (from: string, amount: bigint, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('Burn', (event) => {
      const [from, amount, timestamp] = event.args || [];
      callback(
        from,
        amount,
        new Date(Number(timestamp) * 1000)
      );
    });
  }
} 