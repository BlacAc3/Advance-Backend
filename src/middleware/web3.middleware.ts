import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ApiError } from '../utils/ApiError';
import { ethers } from 'ethers';
import { User } from '../models/User';
import { UserRole } from '../types';

const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

const isValidABI = (abi: any): boolean => {
  if (!Array.isArray(abi)) return false;
  
  return abi.every(item => {
    return (
      typeof item === 'object' &&
      typeof item.name === 'string' &&
      typeof item.type === 'string' &&
      Array.isArray(item.inputs) &&
      Array.isArray(item.outputs)
    );
  });
};

export const validateContractAddress = (path: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const address = path.split('.').reduce((obj, key) => obj?.[key], req);
    
    if (!address || !isValidEthereumAddress(address)) {
      throw new ApiError(400, 'Invalid Ethereum contract address');
    }
    
    next();
  };
};

export const validateABI = (req: Request, res: Response, next: NextFunction) => {
  const abi = req.body.abi || req.query.abi;
  
  if (!abi) {
    throw new ApiError(400, 'ABI is required');
  }

  try {
    const parsedABI = typeof abi === 'string' ? JSON.parse(abi) : abi;
    
    if (!isValidABI(parsedABI)) {
      throw new ApiError(400, 'Invalid ABI format');
    }
    
    // Attach parsed ABI to request for later use
    req.body.abi = parsedABI;
    next();
  } catch (error) {
    throw new ApiError(400, 'Invalid ABI JSON format');
  }
};

export const validateWeb3Request = (req: Request, res: Response, next: NextFunction) => {
  const { method, params, privateKey } = req.body;

  if (method && typeof method !== 'string') {
    throw new ApiError(400, 'Method name must be a string');
  }

  if (params && !Array.isArray(params)) {
    throw new ApiError(400, 'Parameters must be an array');
  }

  if (privateKey && !/^0x[a-fA-F0-9]{64}$/.test(privateKey)) {
    throw new ApiError(400, 'Invalid private key format');
  }

  next();
};

interface WalletAuthHeaders {
  'x-wallet-signature': string;
  'x-wallet-message': string;
  'x-wallet-address': string;
  [key: string]: string | undefined;
}

interface WalletRequestBody {
  walletAddress: string;
}

interface CustomRequest extends Request {
  body: WalletRequestBody;
  headers: WalletAuthHeaders;
  user?: {
    id: string;
    role: UserRole;
    walletAddress?: string;
  };
}

function isWalletAuthHeaders(headers: Record<string, string | undefined>): headers is WalletAuthHeaders {
  return (
    typeof headers['x-wallet-signature'] === 'string' &&
    typeof headers['x-wallet-message'] === 'string' &&
    typeof headers['x-wallet-address'] === 'string'
  );
}

export const validateWalletAddress = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const { walletAddress } = req.body;
  
  if (!walletAddress) {
    throw new ApiError(400, 'Wallet address is required');
  }

  if (!ethers.isAddress(walletAddress)) {
    throw new ApiError(400, 'Invalid wallet address format');
  }

  next();
};

export const requireWalletSignature = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 'x-wallet-signature': signature, 'x-wallet-message': message, 'x-wallet-address': walletAddress } = req.headers;

    if (!ethers.isAddress(walletAddress)) {
      throw new ApiError(400, 'Invalid wallet address format');
    }

    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      throw new ApiError(401, 'Invalid wallet signature');
    }

    const user = await User.findOne({ where: { walletAddress } });
    if (!user) {
      throw new ApiError(404, 'User not found for this wallet address');
    }

    req.user = {
      id: user.id,
      role: user.role,
      walletAddress: user.walletAddress
    };

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError(500, 'Error verifying wallet signature'));
    }
  }
};

export const requireVerifiedWallet = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.walletAddress) {
      throw new ApiError(401, 'Wallet address not found in request');
    }

    const user = await User.findOne({
      where: {
        walletAddress: req.user.walletAddress,
        isWalletVerified: true
      }
    });

    if (!user) {
      throw new ApiError(403, 'Wallet not verified');
    }

    next();
  } catch (error) {
    next(error);
  }
}; 