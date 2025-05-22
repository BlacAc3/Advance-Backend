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

// Define the wallet auth headers type
type WalletAuthHeaders = {
  'x-wallet-signature': string;
  'x-wallet-message': string;
  'x-wallet-address': string;
  [key: string]: string | undefined;
};

// Define the wallet request body type
type WalletRequestBody = {
  walletAddress: string;
};

// Define a custom request type that extends the base Request type
type CustomRequest = Request & {
  body: WalletRequestBody;
  headers: WalletAuthHeaders;
  user?: {
    id: string;
    role: UserRole;
    walletAddress?: string;
  };
};

export const validateWalletAddress = (_req: CustomRequest, _res: Response, next: NextFunction): void => {
  const { walletAddress } = _req.body;
  
  if (!walletAddress) {
    throw new ApiError(400, 'Wallet address is required');
  }

  if (!ethers.isAddress(walletAddress)) {
    throw new ApiError(400, 'Invalid wallet address format');
  }

  next();
};

export const requireWalletSignature = async (_req: CustomRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const signature = _req.headers['x-wallet-signature'];
    const message = _req.headers['x-wallet-message'];
    const walletAddress = _req.headers['x-wallet-address'];

    if (!signature || !message || !walletAddress) {
      throw new ApiError(400, 'Missing required wallet headers');
    }

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

    _req.user = {
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

export const requireVerifiedWallet = async (_req: CustomRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!_req.user?.walletAddress) {
      throw new ApiError(401, 'Wallet address not found in request');
    }

    const user = await User.findOne({
      where: {
        walletAddress: _req.user.walletAddress,
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