import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { web3Controller } from '../controllers/web3.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

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

export { router as web3Routes }; 