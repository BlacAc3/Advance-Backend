import { ethers } from 'ethers';
import { logger } from '../utils/logger';
import { ApiError } from '../utils/ApiError';
import contractService from './contractService';

// Staking contract ABI with proper types
const STAKING_ABI = [
  "function stake(uint256 amount) external returns (bool)",
  "function unstake(uint256 amount) external returns (bool)",
  "function claimRewards() external returns (bool)",
  "function getStakedBalance(address account) view returns (uint256)",
  "function getPendingRewards(address account) view returns (uint256)",
  "function getTotalStaked() view returns (uint256)",
  "function getRewardRate() view returns (uint256)"
] as const;

// Define contract interface
interface IStakingContract extends ethers.BaseContract {
  stake(amount: bigint): Promise<ethers.ContractTransactionResponse>;
  unstake(amount: bigint): Promise<ethers.ContractTransactionResponse>;
  claimRewards(): Promise<ethers.ContractTransactionResponse>;
  getStakedBalance(account: string): Promise<bigint>;
  getPendingRewards(account: string): Promise<bigint>;
  getTotalStaked(): Promise<bigint>;
  getRewardRate(): Promise<bigint>;
}

export class Web3Service {
  private provider: ethers.Provider;
  private stakingContract: IStakingContract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    this.stakingContract = new ethers.Contract(
      process.env.STAKING_CONTRACT_ADDRESS!,
      STAKING_ABI,
      this.provider
    ) as IStakingContract;
  }

  public async getNetworkStatus() {
    try {
      const [blockNumber, gasPrice, network] = await Promise.all([
        this.provider.getBlockNumber(),
        this.provider.getFeeData(),
        this.provider.getNetwork()
      ]);

      return {
        blockNumber,
        gasPrice: gasPrice.gasPrice?.toString(),
        network: {
          name: network.name,
          chainId: network.chainId
        }
      };
    } catch (error) {
      throw new ApiError(500, 'Failed to get network status', error);
    }
  }

  public async verifySignature(message: string, signature: string, walletAddress: string): Promise<boolean> {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
    } catch (error) {
      throw new ApiError(400, 'Failed to verify signature', error);
    }
  }

  public async getBalance(walletAddress: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(walletAddress);
      return balance.toString();
    } catch (error) {
      throw new ApiError(500, 'Failed to get balance', error);
    }
  }

  public async transferTokens(to: string, amount: string, privateKey: string): Promise<string> {
    try {
      const wallet = new ethers.Wallet(privateKey, this.provider);
      const tx = await wallet.sendTransaction({
        to,
        value: ethers.parseEther(amount)
      });
      return tx.hash;
    } catch (error) {
      throw new ApiError(500, 'Failed to transfer tokens', error);
    }
  }

  public async callContract(
    contractAddress: string,
    abi: any[],
    methodName: string,
    params: any[],
    privateKey: string
  ): Promise<string> {
    try {
      const wallet = new ethers.Wallet(privateKey, this.provider);
      const contract = new ethers.Contract(contractAddress, abi, wallet);
      const tx = await contract[methodName](...params);
      return tx.hash;
    } catch (error) {
      throw new ApiError(500, 'Failed to execute contract call', error);
    }
  }

  public async getContractData(
    contractAddress: string,
    abi: any[],
    methodName: string,
    params: any[] = []
  ): Promise<any> {
    try {
      const contract = new ethers.Contract(contractAddress, abi, this.provider);
      const data = await contract[methodName](...params);
      return data;
    } catch (error) {
      throw new ApiError(500, 'Failed to get contract data', error);
    }
  }

  public async getContractEvents(
    contractAddress: string,
    eventName: string,
    fromBlock?: number,
    toBlock?: number
  ): Promise<any[]> {
    try {
      const contract = new ethers.Contract(contractAddress, [], this.provider);
      const filter = contract.filters[eventName]();
      const events = await contract.queryFilter(filter, fromBlock, toBlock);
      return events;
    } catch (error) {
      throw new ApiError(500, 'Failed to get contract events', error);
    }
  }

  public async subscribeToContractEvents(
    contractAddress: string,
    abi: any[],
    eventName: string,
    fromBlock: string | number = 'latest'
  ): Promise<string> {
    try {
      const contract = new ethers.Contract(contractAddress, abi, this.provider);
      const filter = contract.filters[eventName]();
      const subscription = await contract.on(filter, (...args) => {
        // Handle event data
        console.log('Event received:', args);
      });
      return subscription.hash;
    } catch (error) {
      throw new ApiError(500, 'Failed to subscribe to contract events', error);
    }
  }

  public async unsubscribeFromContractEvents(subscriptionId: string): Promise<boolean> {
    try {
      // Implementation depends on how you're managing subscriptions
      // This is a placeholder implementation
      return true;
    } catch (error) {
      throw new ApiError(500, 'Failed to unsubscribe from contract events', error);
    }
  }

  public async getTransactionStatus(txHash: string): Promise<any> {
    try {
      const tx = await this.provider.getTransaction(txHash);
      const receipt = await this.provider.getTransactionReceipt(txHash);
      return {
        hash: txHash,
        status: receipt?.status === 1 ? 'success' : 'failed',
        blockNumber: receipt?.blockNumber,
        confirmations: receipt?.confirmations,
        gasUsed: receipt?.gasUsed.toString(),
        effectiveGasPrice: receipt?.effectiveGasPrice?.toString()
      };
    } catch (error) {
      throw new ApiError(500, 'Failed to get transaction status', error);
    }
  }

  public async getTokenBalance(tokenAddress: string, walletAddress: string): Promise<string> {
    try {
      const tokenABI = [
        'function balanceOf(address owner) view returns (uint256)',
        'function decimals() view returns (uint8)'
      ];
      const contract = new ethers.Contract(tokenAddress, tokenABI, this.provider);
      const [balance, decimals] = await Promise.all([
        contract.balanceOf(walletAddress),
        contract.decimals()
      ]);
      return ethers.formatUnits(balance, decimals);
    } catch (error) {
      throw new ApiError(500, 'Failed to get token balance', error);
    }
  }

  public async getGasPrice(): Promise<string> {
    try {
      const feeData = await this.provider.getFeeData();
      return feeData.gasPrice?.toString() || '0';
    } catch (error) {
      throw new ApiError(500, 'Failed to get gas price', error);
    }
  }

  public async getContractABI(contractName: string): Promise<any[]> {
    try {
      // This would typically fetch from a contract registry or verification service
      // For now, return a placeholder ABI
      return [
        {
          name: 'balanceOf',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ type: 'address', name: 'owner' }],
          outputs: [{ type: 'uint256', name: 'balance' }]
        }
      ];
    } catch (error) {
      throw new ApiError(500, 'Failed to get contract ABI', error);
    }
  }

  public async verifyContract(
    contractAddress: string,
    contractName: string,
    constructorArguments: any[] = []
  ): Promise<any> {
    try {
      // This would typically interact with a contract verification service
      // For now, return a placeholder response
      return {
        verified: true,
        contractAddress,
        contractName,
        constructorArguments
      };
    } catch (error) {
      throw new ApiError(500, 'Failed to verify contract', error);
    }
  }

  // Get default staking token address
  public async getDefaultStakingToken(): Promise<string> {
    try {
      return process.env.STAKING_TOKEN_ADDRESS!;
    } catch (error) {
      logger.error('Error getting default staking token:', error);
      throw new ApiError(500, 'Failed to get default staking token');
    }
  }

  // Get staked balance for a user
  public async getStakedBalance(userId: string, tokenAddress: string): Promise<string> {
    try {
      const balance = await this.stakingContract.getStakedBalance(userId);
      const decimals = await this.getTokenDecimals(tokenAddress);
      return ethers.formatUnits(balance, decimals);
    } catch (error) {
      logger.error('Error getting staked balance:', error);
      throw new ApiError(500, 'Failed to get staked balance');
    }
  }

  // Get pending rewards for a user
  public async getPendingRewards(userId: string, tokenAddress: string): Promise<string> {
    try {
      const rewards = await this.stakingContract.getPendingRewards(userId);
      const decimals = await this.getTokenDecimals(tokenAddress);
      return ethers.formatUnits(rewards, decimals);
    } catch (error) {
      logger.error('Error getting pending rewards:', error);
      throw new ApiError(500, 'Failed to get pending rewards');
    }
  }

  // Stake tokens
  public async stakeTokens(userId: string, amount: string, tokenAddress: string): Promise<string> {
    try {
      const decimals = await this.getTokenDecimals(tokenAddress);
      const amountWei = ethers.parseUnits(amount, decimals);

      // Get user's wallet
      const wallet = await this.getUserWallet(userId);
      if (!wallet) {
        throw new ApiError(400, 'User wallet not found');
      }

      // Approve staking contract to spend tokens
      const tokenContract = await this.getTokenContract(tokenAddress);
      const approveTx = await tokenContract.approve(
        this.stakingContract.address,
        amountWei
      );
      await approveTx.wait();

      // Execute staking transaction
      const stakingTx = await this.stakingContract.connect(wallet).stake(amountWei);
      const receipt = await stakingTx.wait();

      if (!receipt) {
        throw new Error('Transaction failed - no receipt received');
      }

      logger.info('Staking transaction successful', {
        userId,
        amount,
        tokenAddress,
        txHash: receipt.hash
      });

      return receipt.hash;
    } catch (error) {
      logger.error('Error staking tokens:', error);
      throw new ApiError(500, 'Failed to stake tokens');
    }
  }

  // Unstake tokens
  public async unstakeTokens(userId: string, amount: string, tokenAddress: string): Promise<string> {
    try {
      const decimals = await this.getTokenDecimals(tokenAddress);
      const amountWei = ethers.parseUnits(amount, decimals);

      // Get user's wallet
      const wallet = await this.getUserWallet(userId);
      if (!wallet) {
        throw new ApiError(400, 'User wallet not found');
      }

      // Execute unstaking transaction
      const unstakingTx = await this.stakingContract.connect(wallet).unstake(amountWei);
      const receipt = await unstakingTx.wait();

      logger.info('Unstaking transaction successful', {
        userId,
        amount,
        tokenAddress,
        txHash: receipt.hash
      });

      return receipt.hash;
    } catch (error) {
      logger.error('Error unstaking tokens:', error);
      throw new ApiError(500, 'Failed to unstake tokens');
    }
  }

  // Claim rewards
  public async claimRewards(userId: string, tokenAddress: string): Promise<string> {
    try {
      // Get user's wallet
      const wallet = await this.getUserWallet(userId);
      if (!wallet) {
        throw new ApiError(400, 'User wallet not found');
      }

      // Execute reward claiming transaction
      const claimTx = await this.stakingContract.connect(wallet).claimRewards();
      const receipt = await claimTx.wait();

      logger.info('Reward claiming transaction successful', {
        userId,
        tokenAddress,
        txHash: receipt.hash
      });

      return receipt.hash;
    } catch (error) {
      logger.error('Error claiming rewards:', error);
      throw new ApiError(500, 'Failed to claim rewards');
    }
  }

  // Helper: Get token decimals
  private async getTokenDecimals(tokenAddress: string): Promise<number> {
    try {
      const tokenContract = await this.getTokenContract(tokenAddress);
      return await tokenContract.decimals();
    } catch (error) {
      logger.error('Error getting token decimals:', error);
      throw new ApiError(500, 'Failed to get token decimals');
    }
  }

  // Helper: Get user's wallet
  private async getUserWallet(userId: string): Promise<ethers.Wallet | null> {
    try {
      // This should be implemented based on your user wallet storage system
      // For example, you might store encrypted private keys in the database
      const userWalletData = await contractService.getUserWalletData(userId);
      if (!userWalletData?.privateKey) return null;

      return new ethers.Wallet(userWalletData.privateKey, this.provider);
    } catch (error) {
      logger.error('Error getting user wallet:', error);
      return null;
    }
  }

  // Helper: Get token contract
  private async getTokenContract(tokenAddress: string): Promise<ethers.Contract> {
    const tokenABI = [
      "function approve(address spender, uint256 amount) returns (bool)",
      "function decimals() view returns (uint8)",
      "function balanceOf(address account) view returns (uint256)"
    ];
    return new ethers.Contract(tokenAddress, tokenABI, this.provider);
  }
} 