# AdvancePay Backend

Backend server for the AdvancePay decentralized payroll and wage advance platform.

## Features

- JWT-based authentication for Admin, Employers, and Employees
- Web3 wallet integration for liquidity providers
- Role-based access control
- PostgreSQL database with Sequelize ORM
- Smart contract interaction with Base Sepolia network
- RESTful API endpoints for all platform features
- Rate limiting and security middleware
- Comprehensive logging

## Tech Stack

- Node.js with Express.js
- TypeScript
- PostgreSQL with Sequelize ORM
- Ethers.js for blockchain interaction
- JWT for authentication
- Winston for logging
- Jest for testing

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- MetaMask or similar Web3 wallet
- Access to Base Sepolia network

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your environment variables
4. Set up the database:
   ```bash
   npm run db:migrate
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic
│   └── blockchain/  # Smart contract interaction
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── index.ts         # Application entry point
```

## API Documentation

### Authentication Endpoints

- POST /api/v1/auth/login
- POST /api/v1/auth/register
- POST /api/v1/auth/wallet-connect

### Employer Endpoints

- POST /api/v1/employer/onboard
- POST /api/v1/employer/upload-payroll
- GET /api/v1/employer/employees
- PUT /api/v1/employer/approve-advance/:requestId
- GET /api/v1/employer/analytics

### Employee Endpoints

- POST /api/v1/employee/login
- GET /api/v1/employee/salary
- POST /api/v1/employee/request-advance
- GET /api/v1/employee/status

### Web3 Liquidity Provider Endpoints

- POST /api/v1/web3/connect-wallet
- GET /api/v1/web3/stake-summary
- POST /api/v1/web3/stake
- POST /api/v1/web3/unstake
- GET /api/v1/web3/yield-history

### Admin Endpoints

- GET /api/v1/admin/dashboard
- POST /api/v1/admin/create-referral-link
- GET /api/v1/admin/referrals
- GET /api/v1/admin/platform-health

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Security

- All endpoints are protected with appropriate middleware
- Rate limiting is enabled
- Input validation using express-validator
- Helmet.js for security headers
- JWT token-based authentication
- Role-based access control

## License

MIT 