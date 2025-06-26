"use strict";

const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid"); // Assuming uuid is used for some IDs

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // --- Users Seed Data ---
    const users = [
      {
        id: uuidv4(),
        email: "admin@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "ADMIN",
        username: "admin_user",
        isActive: true,
        isWalletVerified: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        email: "employer1@example.com",
        password: await bcrypt.hash("password456", 10),
        role: "EMPLOYER",
        username: "employer_one",
        isActive: true,
        isWalletVerified: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        email: "employee1@example.com",
        password: await bcrypt.hash("password789", 10),
        role: "EMPLOYEE",
        username: "employee_one",
        isActive: true,
        isWalletVerified: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        email: "marketer1@example.com",
        password: await bcrypt.hash("passwordabc", 10),
        role: "MARKETER",
        username: "marketer_one",
        isActive: true,
        isWalletVerified: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        email: "web3user1@example.com",
        password: await bcrypt.hash("passworddef", 10),
        role: "WEB3_USER",
        username: "web3_one",
        isActive: true,
        isWalletVerified: true,
        walletAddress: "0x1234567890123456789012345678901234567890",
        createdAt: now,
        updatedAt: now,
      },
    ];

    await queryInterface.bulkInsert("users", users, {});

    // Retrieve user IDs for foreign key relationships
    const adminUser = await queryInterface.sequelize.query(
      "SELECT id from \"users\" WHERE email = 'admin@example.com' LIMIT 1;",
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );
    const employerUser = await queryInterface.sequelize.query(
      "SELECT id from \"users\" WHERE email = 'employer1@example.com' LIMIT 1;",
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );
    const employeeUser = await queryInterface.sequelize.query(
      "SELECT id from \"users\" WHERE email = 'employee1@example.com' LIMIT 1;",
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );
    const marketerUser = await queryInterface.sequelize.query(
      "SELECT id from \"users\" WHERE email = 'marketer1@example.com' LIMIT 1;",
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    // --- Marketers Seed Data ---
    const marketers = [
      {
        // Assuming id is auto-incremented INTEGER, no need to provide it here
        userId: marketerUser[0].id,
        registrationDate: now,
        createdAt: now,
        updatedAt: now,
      },
    ];
    await queryInterface.bulkInsert("marketers", marketers, {});

    const marketer = await queryInterface.sequelize.query(
      'SELECT id from "marketers" LIMIT 1;',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    // --- Employers Seed Data ---
    const employers = [
      {
        id: uuidv4(),
        userId: employerUser[0].id,
        marketerId: marketer.length > 0 ? marketer[0].id : null, // Link to the created marketer if any
        companyName: "Acme Corporation",
        companyId: "ACME123",
        registrationDate: now,
        isVerified: true,
        verificationDate: now,
        verifiedBy: adminUser[0].id, // Link to the admin user
        createdAt: now,
        updatedAt: now,
      },
    ];
    await queryInterface.bulkInsert("employers", employers, {});

    const employer = await queryInterface.sequelize.query(
      'SELECT id from "employers" LIMIT 1;',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    // --- Employees Seed Data ---
    const employees = [
      {
        id: uuidv4(),
        userId: employeeUser[0].id,
        employerId: employer[0].id,
        registrationDate: now,
        kycStage: "full",
        kycStatus: "approved",
        kycSubmittedAt: now,
        kycReviewedAt: now,
        kycReviewerId: adminUser[0].id, // Link to the admin user
        kycNotes: "Documents reviewed and approved.",
        salary: "5000", // Example salary in wei (5000 ETH)
        createdAt: now,
        updatedAt: now,
      },
    ];
    await queryInterface.bulkInsert("employees", employees, {});

    const employee = await queryInterface.sequelize.query(
      'SELECT id from "employees" LIMIT 1;',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    // --- Advances Seed Data ---
    const advances = [
      {
        id: uuidv4(),
        employeeId: employee[0].id,
        amount: "10000", // 1 ETH in wei
        repaymentAmount: "300000", // 1.1 ETH in wei
        requestDate: now,
        approvalDate: now,
        paymentDate: now,
        dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: "APPROVED",
        transactionHash: "0x123abc456def789ghi",
        repaymentTransactionHash: "0x456def789ghi123abc",
        createdAt: now,
        updatedAt: now,
      },
    ];
    await queryInterface.bulkInsert("advances", advances, {});

    // --- Liquidity Pool Seed Data ---
    const liquidityPool = [
      {
        id: uuidv4(),
        employerId: employer[0].id,
        amount: "590000000000",
        transactionType: "CONTRIBUTION",
        transactionHash: "0x789ghi123abc456def",
        timestamp: now,
        createdAt: now,
        updatedAt: now,
      },
    ];
    await queryInterface.bulkInsert("liquidity_pool", liquidityPool, {}); // Match tableName in model

    // --- Invitations Seed Data ---
    const invitations = [
      {
        id: uuidv4(),
        targetEmail: "newemployee@example.com",
        senderUserId: adminUser[0].id,
        expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: "pending",
        role: "EMPLOYEE",
        createdAt: now,
        updatedAt: now,
      },
    ];
    await queryInterface.bulkInsert("invitations", invitations, {});

    // --- Demo Requests Seed Data ---
    const demoRequests = [
      {
        companyName: "New Company",
        contactName: "John Doe",
        email: "john.doe@newcompany.com",
        phone: "555-123-4567",
        companySize: 50,
        message: "Interested in a demo of your platform.",
        status: "PENDING",
        scheduledDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        notes: "Initial contact made.",
        createdAt: now,
        updatedAt: now,
      },
    ];
    await queryInterface.bulkInsert("demo_requests", demoRequests, {});
  },

  async down(queryInterface, Sequelize) {
    // Drop all seeded data in reverse order
    await queryInterface.bulkDelete("demo_requests", null, {});
    await queryInterface.bulkDelete("invitations", null, {});
    await queryInterface.bulkDelete("liquidity_pool", null, {}); // Match tableName in up
    await queryInterface.bulkDelete("advances", null, {});
    await queryInterface.bulkDelete("employees", null, {});
    await queryInterface.bulkDelete("employers", null, {});
    await queryInterface.bulkDelete("marketers", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
