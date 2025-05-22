import { Request, Response } from 'express';
import { Web3Service } from '../services/web3.service';
import { ApiError } from '../utils/ApiError';
import { logger } from '../utils/logger';

export class Web3Controller {
  private web3Service: Web3Service;

  constructor() {
    this.web3Service = new Web3Service();
  }

  public callContract = async (req: Request, res: Response) => {
    try {
      const { contractAddress, abi, methodName, params, privateKey } = req.body;

      const transactionHash = await this.web3Service.callContract(
        contractAddress,
        abi,
        methodName,
        params,
        privateKey
      );

      res.status(200).json({
        status: 'success',
        data: { transactionHash }
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to execute contract call', error);
    }
  };

  public getContractData = async (req: Request, res: Response) => {
    try {
      const { contractAddress } = req.params;
      const { abi, methodName } = req.query;

      const data = await this.web3Service.getContractData(
        contractAddress,
        JSON.parse(abi as string),
        methodName as string,
        []
      );

      res.status(200).json({
        status: 'success',
        data
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to get contract data', error);
    }
  };

  public subscribeToContractEvents = async (req: Request, res: Response) => {
    try {
      const { contractAddress, abi, eventName, fromBlock } = req.body;

      const subscriptionId = await this.web3Service.subscribeToContractEvents(
        contractAddress,
        abi,
        eventName,
        fromBlock
      );

      res.status(200).json({
        status: 'success',
        data: { subscriptionId }
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to subscribe to contract events', error);
    }
  };

  public unsubscribeFromContractEvents = async (req: Request, res: Response) => {
    try {
      const { subscriptionId } = req.body;

      const unsubscribed = await this.web3Service.unsubscribeFromContractEvents(
        subscriptionId
      );

      res.status(200).json({
        status: 'success',
        data: { unsubscribed }
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to unsubscribe from contract events', error);
    }
  };

  public verifySignature = async (req: Request, res: Response) => {
    try {
      const { message, signature, walletAddress } = req.body;

      const verified = await this.web3Service.verifySignature(
        message,
        signature,
        walletAddress
      );

      res.status(200).json({
        status: 'success',
        data: { verified }
      });
    } catch (error) {
      throw new ApiError(400, 'Failed to verify signature', error);
    }
  };

  public getBalance = async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;

      const balance = await this.web3Service.getBalance(walletAddress);

      res.status(200).json({
        status: 'success',
        data: { balance }
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to get balance', error);
    }
  };

  public transferTokens = async (req: Request, res: Response) => {
    try {
      const { to, amount, privateKey } = req.body;

      const transactionHash = await this.web3Service.transferTokens(
        to,
        amount,
        privateKey
      );

      res.status(200).json({
        status: 'success',
        data: { transactionHash }
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to transfer tokens', error);
    }
  };

  public getNetworkStatus = async (req: Request, res: Response) => {
    try {
      const status = await this.web3Service.getNetworkStatus();
      res.status(200).json({
        status: 'success',
        data: status
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to get network status', error);
    }
  };

  public getContractEvents = async (req: Request, res: Response) => {
    try {
      const { contractAddress, eventName, fromBlock, toBlock } = req.body;
      const events = await this.web3Service.getContractEvents(
        contractAddress,
        eventName,
        fromBlock,
        toBlock
      );
      res.status(200).json({
        status: 'success',
        data: { events }
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to get contract events', error);
    }
  };

  public getTransactionStatus = async (req: Request, res: Response) => {
    try {
      const { txHash } = req.params;
      const status = await this.web3Service.getTransactionStatus(txHash);
      res.status(200).json({
        status: 'success',
        data: status
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to get transaction status', error);
    }
  };

  public getTokenBalance = async (req: Request, res: Response) => {
    try {
      const { tokenAddress, walletAddress } = req.body;
      const balance = await this.web3Service.getTokenBalance(tokenAddress, walletAddress);
      res.status(200).json({
        status: 'success',
        data: { balance }
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to get token balance', error);
    }
  };

  public getGasPrice = async (req: Request, res: Response) => {
    try {
      const gasPrice = await this.web3Service.getGasPrice();
      res.status(200).json({
        status: 'success',
        data: { gasPrice }
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to get gas price', error);
    }
  };

  public getContractABI = async (req: Request, res: Response) => {
    try {
      const { contractName } = req.params;
      const abi = await this.web3Service.getContractABI(contractName);
      res.status(200).json({
        status: 'success',
        data: { abi }
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to get contract ABI', error);
    }
  };

  public verifyContract = async (req: Request, res: Response) => {
    try {
      const { contractAddress, contractName, constructorArguments } = req.body;
      const verification = await this.web3Service.verifyContract(
        contractAddress,
        contractName,
        constructorArguments
      );
      res.status(200).json({
        status: 'success',
        data: verification
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to verify contract', error);
    }
  };

  public stakeTokens = async (req: Request, res: Response) => {
    try {
      const { amount, tokenAddress } = req.body;
      const { userId } = req.user; // From auth middleware

      // Get default token address if not provided
      const tokenContractAddress = tokenAddress || await this.web3Service.getDefaultStakingToken();
      
      // Validate user has sufficient balance
      const balance = await this.web3Service.getTokenBalance(tokenContractAddress, userId);
      if (parseFloat(balance) < parseFloat(amount)) {
        throw new ApiError(400, 'Insufficient token balance');
      }

      // Execute staking transaction
      const txHash = await this.web3Service.stakeTokens(userId, amount, tokenContractAddress);

      // Log the staking event
      logger.info('Tokens staked', {
        userId,
        amount,
        tokenAddress: tokenContractAddress,
        txHash
      });

      res.status(200).json({
        status: 'success',
        data: {
          transactionHash: txHash,
          amount,
          tokenAddress: tokenContractAddress
        }
      });
    } catch (error) {
      logger.error('Staking error:', error);
      throw new ApiError(500, 'Failed to stake tokens', error);
    }
  };

  public unstakeTokens = async (req: Request, res: Response) => {
    try {
      const { amount, tokenAddress } = req.body;
      const { userId } = req.user;

      // Get default token address if not provided
      const tokenContractAddress = tokenAddress || await this.web3Service.getDefaultStakingToken();
      
      // Validate user has sufficient staked balance
      const stakedBalance = await this.web3Service.getStakedBalance(userId, tokenContractAddress);
      if (parseFloat(stakedBalance) < parseFloat(amount)) {
        throw new ApiError(400, 'Insufficient staked balance');
      }

      // Execute unstaking transaction
      const txHash = await this.web3Service.unstakeTokens(userId, amount, tokenContractAddress);

      // Log the unstaking event
      logger.info('Tokens unstaked', {
        userId,
        amount,
        tokenAddress: tokenContractAddress,
        txHash
      });

      res.status(200).json({
        status: 'success',
        data: {
          transactionHash: txHash,
          amount,
          tokenAddress: tokenContractAddress
        }
      });
    } catch (error) {
      logger.error('Unstaking error:', error);
      throw new ApiError(500, 'Failed to unstake tokens', error);
    }
  };

  public claimRewards = async (req: Request, res: Response) => {
    try {
      const { tokenAddress } = req.body;
      const { userId } = req.user;

      // Get default token address if not provided
      const tokenContractAddress = tokenAddress || await this.web3Service.getDefaultStakingToken();
      
      // Check if user has any rewards to claim
      const pendingRewards = await this.web3Service.getPendingRewards(userId, tokenContractAddress);
      if (parseFloat(pendingRewards) <= 0) {
        throw new ApiError(400, 'No rewards available to claim');
      }

      // Execute reward claiming transaction
      const txHash = await this.web3Service.claimRewards(userId, tokenContractAddress);

      // Log the reward claiming event
      logger.info('Rewards claimed', {
        userId,
        amount: pendingRewards,
        tokenAddress: tokenContractAddress,
        txHash
      });

      res.status(200).json({
        status: 'success',
        data: {
          transactionHash: txHash,
          amount: pendingRewards,
          tokenAddress: tokenContractAddress
        }
      });
    } catch (error) {
      logger.error('Reward claiming error:', error);
      throw new ApiError(500, 'Failed to claim rewards', error);
    }
  };
} 