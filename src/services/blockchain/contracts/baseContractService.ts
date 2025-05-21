import { ethers, Contract, EventLog, ContractTransactionResponse, TransactionReceipt } from 'ethers';
import { getProvider, getSigner } from '../blockchainService';
import { logger } from '../../../utils/logger';

export abstract class BaseContractService {
  protected contract: Contract;
  protected provider: ethers.Provider;
  protected signer?: ethers.Signer;

  constructor(
    contractAddress: string,
    contractABI: any[],
    useSigner: boolean = false,
    privateKey?: string
  ) {
    this.provider = getProvider();
    
    if (useSigner && privateKey) {
      this.signer = getSigner(privateKey);
      this.contract = new ethers.Contract(contractAddress, contractABI, this.signer);
    } else {
      this.contract = new ethers.Contract(contractAddress, contractABI, this.provider);
    }
  }

  protected async estimateGas(transaction: ContractTransactionResponse): Promise<bigint> {
    try {
      const gasEstimate = await this.provider.estimateGas(transaction);
      return gasEstimate;
    } catch (error) {
      logger.error('Gas estimation failed:', error);
      throw new Error('Failed to estimate gas for transaction');
    }
  }

  protected async getTransactionReceipt(txHash: string): Promise<TransactionReceipt> {
    try {
      const receipt = await this.provider.getTransactionReceipt(txHash);
      if (!receipt) {
        throw new Error('Transaction receipt not found');
      }
      return receipt;
    } catch (error) {
      logger.error('Failed to get transaction receipt:', error);
      throw new Error('Failed to get transaction receipt');
    }
  }

  protected async waitForTransaction(txHash: string): Promise<TransactionReceipt> {
    try {
      const receipt = await this.provider.waitForTransaction(txHash);
      if (!receipt) {
        throw new Error('Transaction failed');
      }
      return receipt;
    } catch (error) {
      logger.error('Transaction failed:', error);
      throw new Error('Transaction failed');
    }
  }

  protected async getContractBalance(): Promise<bigint> {
    try {
      return await this.provider.getBalance(this.contract.target);
    } catch (error) {
      logger.error('Failed to get contract balance:', error);
      throw new Error('Failed to get contract balance');
    }
  }

  protected async getGasPrice(): Promise<bigint> {
    try {
      const feeData = await this.provider.getFeeData();
      return feeData.gasPrice || BigInt(0);
    } catch (error) {
      logger.error('Failed to get gas price:', error);
      throw new Error('Failed to get gas price');
    }
  }

  // Helper method to format error messages
  protected formatError(error: any): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unknown error occurred';
  }

  // Helper method to log contract events
  protected async logContractEvents(
    eventName: string,
    callback: (event: EventLog) => void
  ): Promise<void> {
    try {
      const event = this.contract.getEvent(eventName);
      if (!event) {
        throw new Error(`Event ${eventName} not found in contract`);
      }

      this.contract.on(event, (event: EventLog) => {
        logger.info(`Contract event ${eventName}:`, {
          eventName,
          args: event.args,
          transactionHash: event.transactionHash,
        });
        callback(event);
      });
    } catch (error) {
      logger.error(`Failed to listen for ${eventName} events:`, error);
      throw new Error(`Failed to listen for ${eventName} events`);
    }
  }
} 