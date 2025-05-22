import request from 'supertest';
import app from '../index';
import { UserRole } from '../types';
import { createTestUser, generateTestTokens } from './utils/testUtils';
import { Web3Service } from '../services/web3.service';
import { mock } from 'jest-mock-extended';

// Mock Web3Service
jest.mock('../services/web3.service');
const MockedWeb3Service = Web3Service as jest.MockedClass<typeof Web3Service>;

describe('Web3 Integration', () => {
  let adminToken: string;
  let employeeToken: string;
  let web3Service: jest.Mocked<Web3Service>;

  beforeEach(async () => {
    const admin = await createTestUser(UserRole.ADMIN);
    const employee = await createTestUser(UserRole.EMPLOYEE);
    
    adminToken = generateTestTokens(admin).accessToken;
    employeeToken = generateTestTokens(employee).accessToken;

    // Reset mock before each test
    jest.clearAllMocks();
    web3Service = mock<Web3Service>();
    MockedWeb3Service.prototype.verifySignature = jest.fn();
    MockedWeb3Service.prototype.getBalance = jest.fn();
    MockedWeb3Service.prototype.transferTokens = jest.fn();
  });

  describe('POST /api/v1/web3/verify-signature', () => {
    it('should verify signature successfully', async () => {
      const signatureData = {
        message: 'Test message',
        signature: '0x' + '1'.repeat(130),
        walletAddress: '0x' + '1'.repeat(40)
      };

      MockedWeb3Service.prototype.verifySignature.mockResolvedValueOnce(true);

      const response = await request(app)
        .post('/api/v1/web3/verify-signature')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(signatureData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.verified).toBe(true);
      expect(MockedWeb3Service.prototype.verifySignature).toHaveBeenCalledWith(
        signatureData.message,
        signatureData.signature,
        signatureData.walletAddress
      );
    });

    it('should reject invalid signature', async () => {
      const signatureData = {
        message: 'Test message',
        signature: 'invalid-signature',
        walletAddress: '0x' + '1'.repeat(40)
      };

      MockedWeb3Service.prototype.verifySignature.mockResolvedValueOnce(false);

      const response = await request(app)
        .post('/api/v1/web3/verify-signature')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(signatureData);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(MockedWeb3Service.prototype.verifySignature).toHaveBeenCalled();
    });
  });

  describe('GET /api/v1/web3/balance/:walletAddress', () => {
    it('should get wallet balance successfully', async () => {
      const walletAddress = '0x' + '1'.repeat(40);
      const mockBalance = '1000000000000000000'; // 1 ETH in wei

      MockedWeb3Service.prototype.getBalance.mockResolvedValueOnce(mockBalance);

      const response = await request(app)
        .get(`/api/v1/web3/balance/${walletAddress}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.balance).toBe(mockBalance);
      expect(MockedWeb3Service.prototype.getBalance).toHaveBeenCalledWith(walletAddress);
    });

    it('should reject invalid wallet address', async () => {
      const invalidAddress = 'invalid-address';

      const response = await request(app)
        .get(`/api/v1/web3/balance/${invalidAddress}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(MockedWeb3Service.prototype.getBalance).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/v1/web3/transfer', () => {
    it('should transfer tokens successfully', async () => {
      const transferData = {
        to: '0x' + '2'.repeat(40),
        amount: '1000000000000000000', // 1 ETH in wei
        privateKey: '0x' + '3'.repeat(64)
      };

      const mockTxHash = '0x' + '4'.repeat(64);
      MockedWeb3Service.prototype.transferTokens.mockResolvedValueOnce(mockTxHash);

      const response = await request(app)
        .post('/api/v1/web3/transfer')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(transferData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.transactionHash).toBe(mockTxHash);
      expect(MockedWeb3Service.prototype.transferTokens).toHaveBeenCalledWith(
        transferData.to,
        transferData.amount,
        transferData.privateKey
      );
    });

    it('should not allow employee to transfer tokens', async () => {
      const transferData = {
        to: '0x' + '2'.repeat(40),
        amount: '1000000000000000000',
        privateKey: '0x' + '3'.repeat(64)
      };

      const response = await request(app)
        .post('/api/v1/web3/transfer')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send(transferData);

      expect(response.status).toBe(403);
      expect(response.body.status).toBe('error');
      expect(MockedWeb3Service.prototype.transferTokens).not.toHaveBeenCalled();
    });

    it('should reject invalid transfer data', async () => {
      const invalidTransferData = {
        to: 'invalid-address',
        amount: 'invalid-amount',
        privateKey: 'invalid-key'
      };

      const response = await request(app)
        .post('/api/v1/web3/transfer')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidTransferData);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(MockedWeb3Service.prototype.transferTokens).not.toHaveBeenCalled();
    });
  });

  describe('Contract Interactions', () => {
    const mockContractAddress = '0x' + '5'.repeat(40);
    const mockContractABI = [
      {
        name: 'getBalance',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'uint256', name: 'balance' }]
      },
      {
        name: 'transfer',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { type: 'address', name: 'to' },
          { type: 'uint256', name: 'amount' }
        ],
        outputs: [{ type: 'bool', name: 'success' }]
      }
    ];

    beforeEach(() => {
      MockedWeb3Service.prototype.callContract = jest.fn();
      MockedWeb3Service.prototype.getContractData = jest.fn();
    });

    describe('POST /api/v1/web3/contract/call', () => {
      it('should execute contract call successfully', async () => {
        const callData = {
          contractAddress: mockContractAddress,
          abi: mockContractABI,
          methodName: 'transfer',
          params: ['0x' + '6'.repeat(40), '1000000000000000000'],
          privateKey: '0x' + '7'.repeat(64)
        };

        const mockTxHash = '0x' + '8'.repeat(64);
        MockedWeb3Service.prototype.callContract.mockResolvedValueOnce(mockTxHash);

        const response = await request(app)
          .post('/api/v1/web3/contract/call')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(callData);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.transactionHash).toBe(mockTxHash);
        expect(MockedWeb3Service.prototype.callContract).toHaveBeenCalledWith(
          callData.contractAddress,
          callData.abi,
          callData.methodName,
          callData.params,
          callData.privateKey
        );
      });

      it('should validate contract address format', async () => {
        const callData = {
          contractAddress: 'invalid-address',
          abi: mockContractABI,
          methodName: 'transfer',
          params: ['0x' + '6'.repeat(40), '1000000000000000000'],
          privateKey: '0x' + '7'.repeat(64)
        };

        const response = await request(app)
          .post('/api/v1/web3/contract/call')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(callData);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(MockedWeb3Service.prototype.callContract).not.toHaveBeenCalled();
      });

      it('should validate ABI format', async () => {
        const callData = {
          contractAddress: mockContractAddress,
          abi: 'invalid-abi',
          methodName: 'transfer',
          params: ['0x' + '6'.repeat(40), '1000000000000000000'],
          privateKey: '0x' + '7'.repeat(64)
        };

        const response = await request(app)
          .post('/api/v1/web3/contract/call')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(callData);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(MockedWeb3Service.prototype.callContract).not.toHaveBeenCalled();
      });
    });

    describe('GET /api/v1/web3/contract/:contractAddress/data', () => {
      it('should get contract data successfully', async () => {
        const mockData = {
          balance: '1000000000000000000',
          owner: '0x' + '9'.repeat(40),
          totalSupply: '1000000000000000000000'
        };

        MockedWeb3Service.prototype.getContractData.mockResolvedValueOnce(mockData);

        const response = await request(app)
          .get(`/api/v1/web3/contract/${mockContractAddress}/data`)
          .set('Authorization', `Bearer ${adminToken}`)
          .query({
            abi: JSON.stringify(mockContractABI),
            methodName: 'getBalance'
          });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data).toEqual(mockData);
        expect(MockedWeb3Service.prototype.getContractData).toHaveBeenCalledWith(
          mockContractAddress,
          mockContractABI,
          'getBalance',
          []
        );
      });

      it('should handle contract read errors gracefully', async () => {
        MockedWeb3Service.prototype.getContractData.mockRejectedValueOnce(
          new Error('Contract read failed')
        );

        const response = await request(app)
          .get(`/api/v1/web3/contract/${mockContractAddress}/data`)
          .set('Authorization', `Bearer ${adminToken}`)
          .query({
            abi: JSON.stringify(mockContractABI),
            methodName: 'getBalance'
          });

        expect(response.status).toBe(500);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toContain('Contract read failed');
      });

      it('should validate contract address in URL', async () => {
        const response = await request(app)
          .get('/api/v1/web3/contract/invalid-address/data')
          .set('Authorization', `Bearer ${adminToken}`)
          .query({
            abi: JSON.stringify(mockContractABI),
            methodName: 'getBalance'
          });

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(MockedWeb3Service.prototype.getContractData).not.toHaveBeenCalled();
      });
    });

    describe('Contract Event Listening', () => {
      it('should subscribe to contract events', async () => {
        const eventData = {
          contractAddress: mockContractAddress,
          abi: mockContractABI,
          eventName: 'Transfer',
          fromBlock: 'latest'
        };

        const mockSubscriptionId = '0x' + 'a'.repeat(64);
        MockedWeb3Service.prototype.subscribeToContractEvents = jest.fn()
          .mockResolvedValueOnce(mockSubscriptionId);

        const response = await request(app)
          .post('/api/v1/web3/contract/events/subscribe')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(eventData);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.subscriptionId).toBe(mockSubscriptionId);
        expect(MockedWeb3Service.prototype.subscribeToContractEvents).toHaveBeenCalledWith(
          eventData.contractAddress,
          eventData.abi,
          eventData.eventName,
          eventData.fromBlock
        );
      });

      it('should unsubscribe from contract events', async () => {
        const subscriptionId = '0x' + 'a'.repeat(64);
        MockedWeb3Service.prototype.unsubscribeFromContractEvents = jest.fn()
          .mockResolvedValueOnce(true);

        const response = await request(app)
          .post('/api/v1/web3/contract/events/unsubscribe')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ subscriptionId });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.unsubscribed).toBe(true);
        expect(MockedWeb3Service.prototype.unsubscribeFromContractEvents)
          .toHaveBeenCalledWith(subscriptionId);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle web3 service errors gracefully', async () => {
      const walletAddress = '0x' + '1'.repeat(40);
      
      MockedWeb3Service.prototype.getBalance.mockRejectedValueOnce(
        new Error('Failed to connect to blockchain')
      );

      const response = await request(app)
        .get(`/api/v1/web3/balance/${walletAddress}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toContain('Failed to connect to blockchain');
    });
  });
}); 