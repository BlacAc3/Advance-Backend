import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { Web3Controller } from '../controllers/web3.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateContractAddress, validateABI, validateWeb3Request } from '../middleware/web3.middleware';
import contractService from '../services/contractService';
import { logger } from '../utils/logger';
import { ethers } from 'ethers';
import { authenticate, authenticateWeb3 } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';
import { UserRole } from '../types';

const router = Router();
const web3Controller = new Web3Controller();

// Public routes
router.post('/connect', authenticateWeb3, web3Controller.connectWallet);
router.post('/verify', authenticateWeb3, web3Controller.verifySignature);

// Protected routes
router.use(authenticate);
router.use(authorize([UserRole.WEB3_USER]));

// Wallet management
router.get('/wallet', web3Controller.getWalletInfo);
router.post('/wallet/transfer', web3Controller.transferTokens);
router.get('/wallet/transactions', web3Controller.getTransactions);

// NFT management
router.get('/nfts', web3Controller.getNFTs);
router.get('/nfts/:id', web3Controller.getNFTDetails);
router.post('/nfts/mint', web3Controller.mintNFT);
router.post('/nfts/:id/transfer', web3Controller.transferNFT);

// All routes require authentication
router.use(authMiddleware);

// Get blockchain network status
router.get(
  '/status',
  web3Controller.getNetworkStatus
);

// Get contract events
router.get(
  '/events',
  [
    body('contractAddress').matches(/^0x[a-fA-F0-9]{40}$/),
    body('eventName').notEmpty(),
    body('fromBlock').optional().isNumeric(),
    body('toBlock').optional().isNumeric(),
    validateRequest,
  ],
  web3Controller.getContractEvents
);

// Get transaction status
router.get(
  '/transactions/:txHash',
  web3Controller.getTransactionStatus
);

// Get token balance
router.get(
  '/balance',
  [
    body('tokenAddress').optional().matches(/^0x[a-fA-F0-9]{40}$/),
    validateRequest,
  ],
  web3Controller.getTokenBalance
);

// Get gas price estimate
router.get(
  '/gas-price',
  web3Controller.getGasPrice
);

// Get contract ABI
router.get(
  '/contracts/:contractName/abi',
  web3Controller.getContractABI
);

// Verify contract
router.post(
  '/contracts/verify',
  [
    body('contractAddress').matches(/^0x[a-fA-F0-9]{40}$/),
    body('contractName').notEmpty(),
    body('constructorArguments').optional().isArray(),
    validateRequest,
  ],
  web3Controller.verifyContract
);

// Contract interaction routes
router.post(
  '/contract/call',
  validateWeb3Request,
  validateContractAddress('contractAddress'),
  validateABI,
  web3Controller.callContract
);

router.get(
  '/contract/:contractAddress/data',
  validateContractAddress('params.contractAddress'),
  validateABI,
  web3Controller.getContractData
);

// Contract event routes
router.post(
  '/contract/events/subscribe',
  validateWeb3Request,
  validateContractAddress('contractAddress'),
  validateABI,
  web3Controller.subscribeToContractEvents
);

router.post(
  '/contract/events/unsubscribe',
  validateWeb3Request,
  web3Controller.unsubscribeFromContractEvents
);

// Existing routes
router.get('/balance/:walletAddress', web3Controller.getBalance);

// Get contract addresses
router.get('/contracts', async (req, res) => {
  try {
    const addresses = {
      accessControl: await contractService.getContract('accessControl').getAddress(),
      mockStablecoin: await contractService.getContract('mockStablecoin').getAddress(),
      employerRegistry: await contractService.getContract('employerRegistry').getAddress(),
      cngnOnRamp: await contractService.getContract('cngnOnRamp').getAddress(),
      reserveFund: await contractService.getContract('reserveFund').getAddress(),
      advanceEngine: await contractService.getContract('advanceEngine').getAddress(),
      web3LiquidityPool: await contractService.getContract('web3LiquidityPool').getAddress(),
    };
    res.json({ status: 'success', data: addresses });
  } catch (error) {
    logger.error('Error getting contract addresses:', error);
    res.status(500).json({ status: 'error', message: 'Failed to get contract addresses' });
  }
});

// Get wallet balance
router.get('/wallet/balance', async (req, res) => {
  try {
    const address = await contractService.getWalletAddress();
    const balance = await contractService.getBalance(address);
    res.json({
      status: 'success',
      data: {
        address,
        balance: balance.toString(),
        balanceInEth: ethers.formatEther(balance)
      }
    });
  } catch (error) {
    logger.error('Error getting wallet balance:', error);
    res.status(500).json({ status: 'error', message: 'Failed to get wallet balance' });
  }
});

// Get token balance
router.get('/token/balance/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const tokenAddress = await contractService.getContract('mockStablecoin').getAddress();
    const balance = await contractService.getTokenBalance(tokenAddress, address);
    res.json({
      status: 'success',
      data: {
        tokenAddress,
        address,
        balance: balance.toString(),
        balanceInTokens: ethers.formatUnits(balance, 6) // USDC has 6 decimals
      }
    });
  } catch (error) {
    logger.error('Error getting token balance:', error);
    res.status(500).json({ status: 'error', message: 'Failed to get token balance' });
  }
});

// Check role
router.get('/role/:role/:address', async (req, res) => {
  try {
    const { role, address } = req.params;
    const hasRole = await contractService.hasRole(role, address);
    res.json({
      status: 'success',
      data: {
        role,
        address,
        hasRole
      }
    });
  } catch (error) {
    logger.error('Error checking role:', error);
    res.status(500).json({ status: 'error', message: 'Failed to check role' });
  }
});

// Grant role (admin only)
router.post('/role/grant', async (req, res) => {
  try {
    const { role, address } = req.body;
    if (!role || !address) {
      return res.status(400).json({
        status: 'error',
        message: 'Role and address are required'
      });
    }

    const tx = await contractService.grantRole(role, address);
    const receipt = await tx.wait();
    
    if (!receipt) {
      throw new Error('Transaction failed - no receipt received');
    }

    res.json({
      status: 'success',
      data: {
        role,
        address,
        transactionHash: receipt.hash
      }
    });
  } catch (error) {
    logger.error('Error granting role:', error);
    res.status(500).json({ status: 'error', message: 'Failed to grant role' });
  }
});

// Staking routes
router.post(
  '/stake',
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('tokenAddress').optional().matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Invalid token address'),
    validateRequest,
  ],
  web3Controller.stakeTokens
);

router.post(
  '/unstake',
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('tokenAddress').optional().matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Invalid token address'),
    validateRequest,
  ],
  web3Controller.unstakeTokens
);

router.post(
  '/claim-rewards',
  [
    body('tokenAddress').optional().matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Invalid token address'),
    validateRequest,
  ],
  web3Controller.claimRewards
);

export default router; 