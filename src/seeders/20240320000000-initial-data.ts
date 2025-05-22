import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function up(queryInterface: QueryInterface) {
  // Create admin user
  const adminId = uuidv4();
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await queryInterface.bulkInsert('Users', [{
    id: adminId,
    email: 'admin@advancepay.com',
    password: hashedPassword,
    role: 'ADMIN',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  // Create sample staking pool
  await queryInterface.bulkInsert('StakingPools', [{
    id: uuidv4(),
    name: 'USDC Staking Pool',
    tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC on Ethereum mainnet
    apy: 5.00,
    minStakeAmount: 100.00,
    maxStakeAmount: 1000000.00,
    isActive: true,
    totalStaked: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: uuidv4(),
    name: 'DAI Staking Pool',
    tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI on Ethereum mainnet
    apy: 4.50,
    minStakeAmount: 100.00,
    maxStakeAmount: 1000000.00,
    isActive: true,
    totalStaked: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  // Create sample employer for testing
  const employerId = uuidv4();
  const employerUserId = uuidv4();
  const employerHashedPassword = await bcrypt.hash('employer123', 10);

  await queryInterface.bulkInsert('Users', [{
    id: employerUserId,
    email: 'employer@example.com',
    password: employerHashedPassword,
    role: 'EMPLOYER',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  await queryInterface.bulkInsert('Employers', [{
    id: employerId,
    userId: employerUserId,
    companyName: 'Sample Company Inc.',
    companyAddress: '123 Business St, Enterprise City, EC 12345',
    companyWebsite: 'https://samplecompany.com',
    companySize: 50,
    industry: 'Technology',
    isVerified: true,
    verificationDocuments: JSON.stringify({
      businessLicense: 'BL123456',
      taxId: 'TAX789012'
    }),
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  // Create sample employee for testing
  const employeeId = uuidv4();
  const employeeUserId = uuidv4();
  const employeeHashedPassword = await bcrypt.hash('employee123', 10);

  await queryInterface.bulkInsert('Users', [{
    id: employeeUserId,
    email: 'employee@example.com',
    password: employeeHashedPassword,
    role: 'EMPLOYEE',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  await queryInterface.bulkInsert('Employees', [{
    id: employeeId,
    userId: employeeUserId,
    employerId: employerId,
    salary: 5000.00,
    payFrequency: 'MONTHLY',
    nextPayDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    isApproved: true,
    employmentStartDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
}

export async function down(queryInterface: QueryInterface) {
  // Remove all seeded data
  await queryInterface.bulkDelete('Employees', {}, {});
  await queryInterface.bulkDelete('Employers', {}, {});
  await queryInterface.bulkDelete('StakingPools', {}, {});
  await queryInterface.bulkDelete('Users', {}, {});
} 