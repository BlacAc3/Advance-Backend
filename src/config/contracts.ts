// Contract addresses for Base Goerli network
export const CONTRACT_ADDRESSES = {
  // Core contracts
  AccessControlManager: "0x75F8683aD22FAAC386D2628247a9a3dD3e92B036",
  MockStablecoin: "0x81eD8dCaA88c09e92A234611d1cC80157EaD6b5e",
  EmployerRegistry: "0x3FD3bE89074CBdB99eCc871c3fB426F469471566",
  CNGNOnRamp: "0xa44Df5707932e9885B1F7127019Badb801cE05e6",
  ReserveFund: "0xF4Ebe32C7024834E19391B1451640703e3321FE5",
  AdvanceEngine: "0x7974d2A221EaddbbE65c5890Ef7789cA7913917F",
  Web3LiquidityPool: "0x8Be96F6e8DB927E0A58404eE608ceD8fd68a4bAC",
} as const;

// Network configuration
export const NETWORK_CONFIG = {
  chainId: '84531', // Base Goerli
  chainName: 'Base Goerli',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://goerli.base.org'],
  blockExplorerUrls: ['https://goerli.basescan.org'],
} as const;

// Contract roles (for access control)
export const CONTRACT_ROLES = {
  ADMIN_ROLE: '0x0000000000000000000000000000000000000000000000000000000000000000',
  EMPLOYER_ROLE: '0x0000000000000000000000000000000000000000000000000000000000000001',
  EMPLOYEE_ROLE: '0x0000000000000000000000000000000000000000000000000000000000000002',
  WEB3_USER_ROLE: '0x0000000000000000000000000000000000000000000000000000000000000003',
} as const;

// Contract interfaces
export interface ContractAddresses {
  AccessControlManager: string;
  MockStablecoin: string;
  EmployerRegistry: string;
  CNGNOnRamp: string;
  ReserveFund: string;
  AdvanceEngine: string;
  Web3LiquidityPool: string;
}

export interface NetworkConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export interface ContractRoles {
  ADMIN_ROLE: string;
  EMPLOYER_ROLE: string;
  EMPLOYEE_ROLE: string;
  WEB3_USER_ROLE: string;
} 