import { ethers } from 'ethers';
import { BaseContractService } from './baseContractService';
import { contractAddresses } from '../blockchainService';
import { logger } from '../../../utils/logger';

// Import ABI from your contracts
const LiquidityPoolABI = [
  // Liquidity Management
  "function deposit(uint256 amount) returns (bool)",
  "function withdraw(uint256 amount) returns (bool)",
  "function getLiquidityProviderBalance(address provider) view returns (uint256)",
  "function getTotalLiquidity() view returns (uint256)",
  "function getAvailableLiquidity() view returns (uint256)",
  "function getUtilizationRate() view returns (uint256)",
  "function getProviderCount() view returns (uint256)",
  "function getProviderByIndex(uint256 index) view returns (address)",
  
  // Rewards
  "function claimRewards() returns (uint256)",
  "function getUnclaimedRewards(address provider) view returns (uint256)",
  "function getRewardRate() view returns (uint256)",
  
  // Events
  "event LiquidityDeposited(address indexed provider, uint256 amount, uint256 timestamp)",
  "event LiquidityWithdrawn(address indexed provider, uint256 amount, uint256 timestamp)",
  "event RewardsClaimed(address indexed provider, uint256 amount, uint256 timestamp)",
  "event UtilizationRateUpdated(uint256 newRate, uint256 timestamp)"
];

export interface LiquidityPoolStats {
  totalLiquidity: bigint;
  availableLiquidity: bigint;
  utilizationRate: number;
  providerCount: number;
  rewardRate: number;
}

export class LiquidityPoolService extends BaseContractService {
  private static instance: LiquidityPoolService;

  private constructor(privateKey?: string) {
    super(
      contractAddresses.liquidityPool,
      LiquidityPoolABI,
      !!privateKey,
      privateKey
    );
  }

  public static getInstance(privateKey?: string): LiquidityPoolService {
    if (!LiquidityPoolService.instance) {
      LiquidityPoolService.instance = new LiquidityPoolService(privateKey);
    }
    return LiquidityPoolService.instance;
  }

  // Liquidity Management
  async deposit(amount: bigint): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.deposit(amount);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to deposit liquidity:', error);
      throw new Error(this.formatError(error));
    }
  }

  async withdraw(amount: bigint): Promise<ethers.TransactionReceipt> {
    try {
      const tx = await this.contract.withdraw(amount);
      return await this.waitForTransaction(tx.hash);
    } catch (error) {
      logger.error('Failed to withdraw liquidity:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getLiquidityProviderBalance(providerAddress: string): Promise<bigint> {
    try {
      return await this.contract.getLiquidityProviderBalance(providerAddress);
    } catch (error) {
      logger.error('Failed to get provider balance:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getPoolStats(): Promise<LiquidityPoolStats> {
    try {
      const [
        totalLiquidity,
        availableLiquidity,
        utilizationRate,
        providerCount,
        rewardRate
      ] = await Promise.all([
        this.contract.getTotalLiquidity(),
        this.contract.getAvailableLiquidity(),
        this.contract.getUtilizationRate(),
        this.contract.getProviderCount(),
        this.contract.getRewardRate()
      ]);

      return {
        totalLiquidity,
        availableLiquidity,
        utilizationRate: Number(utilizationRate),
        providerCount: Number(providerCount),
        rewardRate: Number(rewardRate)
      };
    } catch (error) {
      logger.error('Failed to get pool stats:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getProviderByIndex(index: number): Promise<string> {
    try {
      return await this.contract.getProviderByIndex(index);
    } catch (error) {
      logger.error('Failed to get provider by index:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Rewards
  async claimRewards(): Promise<{ amount: bigint; receipt: ethers.TransactionReceipt }> {
    try {
      const tx = await this.contract.claimRewards();
      const receipt = await this.waitForTransaction(tx.hash);
      
      // Get the claimed amount from the event
      const event = receipt.logs
        .filter((log: ethers.Log) => {
          try {
            return this.contract.interface.parseLog(log)?.name === 'RewardsClaimed';
          } catch {
            return false;
          }
        })
        .map(log => this.contract.interface.parseLog(log))[0];
      
      const amount = event?.args[1] as bigint;
      return { amount, receipt };
    } catch (error) {
      logger.error('Failed to claim rewards:', error);
      throw new Error(this.formatError(error));
    }
  }

  async getUnclaimedRewards(providerAddress: string): Promise<bigint> {
    try {
      return await this.contract.getUnclaimedRewards(providerAddress);
    } catch (error) {
      logger.error('Failed to get unclaimed rewards:', error);
      throw new Error(this.formatError(error));
    }
  }

  // Event Listeners
  async onLiquidityProvided(
    callback: (provider: string, amount: bigint, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('LiquidityProvided', (event) => {
      const [provider, amount, timestamp] = event.args || [];
      callback(
        provider,
        amount,
        new Date(Number(timestamp) * 1000)
      );
    });
  }

  async onLiquidityWithdrawn(
    callback: (provider: string, amount: bigint, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('LiquidityWithdrawn', (event) => {
      const [provider, amount, timestamp] = event.args || [];
      callback(
        provider,
        amount,
        new Date(Number(timestamp) * 1000)
      );
    });
  }

  async onInterestPaid(
    callback: (provider: string, amount: bigint, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('InterestPaid', (event) => {
      const [provider, amount, timestamp] = event.args || [];
      callback(
        provider,
        amount,
        new Date(Number(timestamp) * 1000)
      );
    });
  }

  async onPoolStateUpdated(
    callback: (totalLiquidity: bigint, availableLiquidity: bigint, timestamp: Date) => void
  ): Promise<void> {
    await this.logContractEvents('PoolStateUpdated', (event) => {
      const [totalLiquidity, availableLiquidity, timestamp] = event.args || [];
      callback(
        totalLiquidity,
        availableLiquidity,
        new Date(Number(timestamp) * 1000)
      );
    });
  }
} 