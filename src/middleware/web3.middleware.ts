import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

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