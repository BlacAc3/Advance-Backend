import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ApiError } from "../utils/ApiError";
import { ethers } from "ethers";
import { User } from "../models/User";
import { UserRole } from "../types";

const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

const isValidABI = (abi: any): boolean => {
  if (!Array.isArray(abi)) return false;

  return abi.every((item) => {
    return (
      typeof item === "object" &&
      typeof item.name === "string" &&
      typeof item.type === "string" &&
      Array.isArray(item.inputs) &&
      Array.isArray(item.outputs)
    );
  });
};

export const validateContractAddress = (path: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const address = path.split(".").reduce((obj: any, key: string) => {
      return obj?.[key];
    }, req as any); // Start the reduce with the request object, asserted as any

    // Check if the retrieved value is a string and a valid Ethereum address.
    // The typeof check handles cases where the path doesn't exist or the value
    // found at the path is not a string, which fixes the type error for isValidEthereumAddress.
    if (typeof address !== "string" || !isValidEthereumAddress(address)) {
      throw new ApiError(400, "Invalid Ethereum contract address");
    }

    next();
  };
};

export const validateABI = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const abi = req.body.abi || req.query.abi;

  if (!abi) {
    throw new ApiError(400, "ABI is required");
  }

  try {
    const parsedABI = typeof abi === "string" ? JSON.parse(abi) : abi;

    if (!isValidABI(parsedABI)) {
      throw new ApiError(400, "Invalid ABI format");
    }

    // Attach parsed ABI to request for later use
    req.body.abi = parsedABI;
    next();
  } catch (error) {
    throw new ApiError(400, "Invalid ABI JSON format");
  }
};

export const validateWeb3Request = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { method, params, privateKey } = req.body;

  if (method && typeof method !== "string") {
    throw new ApiError(400, "Method name must be a string");
  }

  if (params && !Array.isArray(params)) {
    throw new ApiError(400, "Parameters must be an array");
  }

  if (privateKey && !/^0x[a-fA-F0-9]{64}$/.test(privateKey)) {
    throw new ApiError(400, "Invalid private key format");
  }

  next();
};

// Define the wallet auth headers type
type WalletAuthHeaders = {
  "x-wallet-signature": string;
  "x-wallet-message": string;
  "x-wallet-address": string;
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

export const validateWalletAddress = (
  _req: CustomRequest,
  _res: Response,
  next: NextFunction,
): void => {
  const { walletAddress } = _req.body;

  if (!walletAddress) {
    throw new ApiError(400, "Wallet address is required");
  }

  if (!ethers.isAddress(walletAddress)) {
    throw new ApiError(400, "Invalid wallet address format");
  }

  next();
};
export const requireWalletSignature = async (
  _req: CustomRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const signature = _req.headers["x-wallet-signature"];
    const message = _req.headers["x-wallet-message"];
    const walletAddress = _req.headers["x-wallet-address"];

    if (!signature || !message || !walletAddress) {
      throw new ApiError(400, "Missing required wallet headers");
    }

    if (!ethers.isAddress(walletAddress)) {
      throw new ApiError(400, "Invalid wallet address format");
    }

    // Note: ethers.verifyMessage needs the message to be a string or Uint8Array.
    // Headers are strings, so this is fine.
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      throw new ApiError(401, "Invalid wallet signature");
    }

    const user = await User.findOne({ where: { walletAddress } });
    if (!user) {
      throw new ApiError(404, "User not found for this wallet address");
    }

    // Assign user details to request object.
    // The type definition for `_req.user` seems to be a composite type (TokenPayload & { ... })
    // which requires a 'userId' property. We map the User model's 'id' to 'userId'.
    // It also seems to require 'id' itself, so we include it as well based on the error message.
    _req.user = {
      userId: user.id, // Required by TokenPayload based on error
      id: user.id, // Required by the intersection type based on error
      role: user.role,
      walletAddress: user.walletAddress,
    };

    return next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else {
      // Log unexpected errors in production
      console.error("Error during wallet signature verification:", error);
      next(new ApiError(500, "Error verifying wallet signature"));
    }
  }
};

export const requireVerifiedWallet = async (
  _req: CustomRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!_req.user?.walletAddress) {
      throw new ApiError(401, "Wallet address not found in request");
    }

    const user = await User.findOne({
      where: {
        walletAddress: _req.user.walletAddress,
        isWalletVerified: true,
      },
    });

    if (!user) {
      throw new ApiError(403, "Wallet not verified");
    }

    next();
  } catch (error) {
    next(error);
  }
};
