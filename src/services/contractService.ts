import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, NETWORK_CONFIG } from '../config/contracts';
import { ContractAddresses } from '../config/contracts';
import { logger } from '../utils/logger';
import { ApiError } from '../utils/ApiError';
import { User } from '../models/User';

// Import contract ABIs
const AccessControlManagerABI = require('../../../artifacts/contracts/AccessControlManager.sol/AccessControlManager.json').abi;
const MockERC20ABI = require('../../../artifacts/contracts/mocks/MockERC20.sol/MockERC20.json').abi;
const EmployerRegistryABI = require('../../../artifacts/contracts/EmployerRegistry.sol/EmployerRegistry.json').abi;
const CNGNOnRampABI = require('../../../artifacts/contracts/CNGNOnRamp.sol/CNGNOnRamp.json').abi;
const ReserveFundABI = require('../../../artifacts/contracts/ReserveFund.sol/ReserveFund.json').abi;
const AdvanceEngineABI = require('../../../artifacts/contracts/AdvanceEngine.sol/AdvanceEngine.json').abi;
const Web3LiquidityPoolABI = require('../../../artifacts/contracts/Web3LiquidityPool.sol/Web3LiquidityPool.json').abi;

interface UserWalletData {
  privateKey: string;
  address: string;
}

class ContractService {
  private provider: ethers.JsonRpcProvider;
  private contracts: Record<string, ethers.Contract>;
  private wallet: ethers.Wallet;

  constructor() {
    // Initialize provider with Base Goerli RPC URL
    this.provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrls[0]);
    
    // Initialize wallet with private key from environment variable
    const privateKey = process.env.WALLET_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('WALLET_PRIVATE_KEY environment variable is not set');
    }
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    
    // Initialize contracts
    this.contracts = this.initializeContracts();
  }

  private initializeContracts(): Record<string, ethers.Contract> {
    return {
      accessControl: new ethers.Contract(
        CONTRACT_ADDRESSES.AccessControlManager,
        AccessControlManagerABI,
        this.wallet
      ),
      mockStablecoin: new ethers.Contract(
        CONTRACT_ADDRESSES.MockStablecoin,
        MockERC20ABI,
        this.wallet
      ),
      employerRegistry: new ethers.Contract(
        CONTRACT_ADDRESSES.EmployerRegistry,
        EmployerRegistryABI,
        this.wallet
      ),
      cngnOnRamp: new ethers.Contract(
        CONTRACT_ADDRESSES.CNGNOnRamp,
        CNGNOnRampABI,
        this.wallet
      ),
      reserveFund: new ethers.Contract(
        CONTRACT_ADDRESSES.ReserveFund,
        ReserveFundABI,
        this.wallet
      ),
      advanceEngine: new ethers.Contract(
        CONTRACT_ADDRESSES.AdvanceEngine,
        AdvanceEngineABI,
        this.wallet
      ),
      web3LiquidityPool: new ethers.Contract(
        CONTRACT_ADDRESSES.Web3LiquidityPool,
        Web3LiquidityPoolABI,
        this.wallet
      ),
    };
  }

  // Contract interaction methods
  getContract(contractName: keyof typeof this.contracts): ethers.Contract {
    const contract = this.contracts[contractName];
    if (!contract) {
      throw new Error(`Contract ${contractName} not initialized`);
    }
    return contract;
  }

  async getWalletAddress(): Promise<string> {
    return await this.wallet.getAddress();
  }

  async getNetwork(): Promise<ethers.Network> {
    return await this.provider.getNetwork();
  }

  // Helper methods for common contract interactions
  async hasRole(role: string, address: string): Promise<boolean> {
    const accessControl = this.getContract('accessControl');
    return await accessControl.hasRole(role, address);
  }

  async grantRole(role: string, address: string): Promise<ethers.ContractTransactionResponse> {
    const accessControl = this.getContract('accessControl');
    return await accessControl.grantRole(role, address);
  }

  async revokeRole(role: string, address: string): Promise<ethers.ContractTransactionResponse> {
    const accessControl = this.getContract('accessControl');
    return await accessControl.revokeRole(role, address);
  }

  async getBalance(address: string): Promise<bigint> {
    return await this.provider.getBalance(address);
  }

  async getTokenBalance(tokenAddress: string, address: string): Promise<bigint> {
    const token = new ethers.Contract(tokenAddress, MockERC20ABI, this.provider);
    return await token.balanceOf(address);
  }

  public async getUserWalletData(userId: string): Promise<UserWalletData | null> {
    try {
      const user = await User.findByPk(userId);
      if (!user?.walletData) return null;

      // In production, you should decrypt the wallet data
      // This is just a placeholder implementation
      return {
        privateKey: user.walletData.privateKey,
        address: user.walletData.address
      };
    } catch (error) {
      logger.error('Error getting user wallet data:', error);
      return null;
    }
  }
}

// Create a singleton instance
const contractService = new ContractService();
export default contractService; 