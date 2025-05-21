import { ethers } from 'ethers';
import { logger } from '../../utils/logger';

const {
  BASE_SEPOLIA_RPC_URL = 'https://sepolia.base.org',
  ACCESS_CONTROL_MANAGER_ADDRESS = '0x8b1Af74f2b986262A1ad454017E1e63A64273297',
  MOCK_STABLECOIN_ADDRESS = '0x499F5Df1ac3dC1ae5a8F157Dd2d56da5B7661355',
  EMPLOYER_REGISTRY_CONTRACT_ADDRESS = '0xDE5a579be0B27144FaA88518c29E159A289E4Dd5',
  CNGN_ONRAMP_CONTRACT_ADDRESS = '0x085a1b5e8E2477fE8f13A2aBF5f2764acB9F8AcD',
  RESERVE_FUND_CONTRACT_ADDRESS = '0xc5df5DD3a8866cf460bCc22fFeda9eA284f778F2',
  ADVANCE_ENGINE_CONTRACT_ADDRESS = '0x9928fddB65d41eE2798422CE670e62d0f324391F',
} = process.env;

// Initialize provider
const provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC_URL);

export const checkBlockchainConnection = async () => {
  try {
    // Check network connection
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();
    const gasPrice = await provider.getFeeData();

    // Check contract addresses
    const contracts = {
      accessControlManager: ACCESS_CONTROL_MANAGER_ADDRESS,
      mockStablecoin: MOCK_STABLECOIN_ADDRESS,
      employerRegistry: EMPLOYER_REGISTRY_CONTRACT_ADDRESS,
      cngnOnRamp: CNGN_ONRAMP_CONTRACT_ADDRESS,
      reserveFund: RESERVE_FUND_CONTRACT_ADDRESS,
      advanceEngine: ADVANCE_ENGINE_CONTRACT_ADDRESS,
    };

    // Verify contract addresses are valid
    const contractStatus = Object.entries(contracts).reduce((acc, [key, address]) => {
      acc[key] = ethers.isAddress(address);
      return acc;
    }, {} as Record<string, boolean>);

    return {
      network: {
        name: network.name,
        chainId: network.chainId,
        blockNumber,
        gasPrice: gasPrice.gasPrice?.toString(),
      },
      contracts: contractStatus,
      status: 'connected',
    };
  } catch (error) {
    logger.error('Blockchain connection check failed:', error);
    throw new Error('Failed to connect to blockchain network');
  }
};

// Export provider for use in other services
export const getProvider = () => provider;

// Export a function to get a signer for transactions
export const getSigner = (privateKey: string) => {
  if (!privateKey) {
    throw new Error('Private key is required for signing transactions');
  }
  return new ethers.Wallet(privateKey, provider);
};

// Export contract addresses
export const contractAddresses = {
  accessControlManager: process.env.ACCESS_CONTROL_MANAGER_ADDRESS || '',
  mockStablecoin: process.env.MOCK_STABLECOIN_ADDRESS || '',
  employerRegistry: process.env.EMPLOYER_REGISTRY_ADDRESS || '',
  employeeRegistry: process.env.EMPLOYEE_REGISTRY_ADDRESS || '',
  liquidityPool: process.env.LIQUIDITY_POOL_ADDRESS || '',
  advanceEngine: process.env.ADVANCE_ENGINE_ADDRESS || '',
  cngnOnRamp: process.env.CNGN_ONRAMP_ADDRESS || '',
  reserveFund: process.env.RESERVE_FUND_ADDRESS || ''
} as const; 