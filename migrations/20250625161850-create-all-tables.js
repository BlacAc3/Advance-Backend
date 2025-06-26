"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create tables respecting foreign key dependencies
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(
          "ADMIN",
          "EMPLOYER",
          "EMPLOYEE",
          "MARKETER",
          "WEB3_USER",
        ), // Ensure all roles from UserRole enum are included
        allowNull: false,
        defaultValue: "WEB3_USER", // Match the default in the User model
      },
      walletAddress: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      isWalletVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable("marketers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        // FK to Users (UUID)
        type: Sequelize.UUID,
        allowNull: false,
        unique: true, // 1-to-1 with User
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      registrationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.createTable("employers", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        // FK to Users (UUID)
        type: Sequelize.UUID,
        allowNull: false,
        unique: true, // 1-to-1 with User
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      marketerId: {
        // FK to Marketers (INTEGER) - NOTE: Marketer ID is INTEGER in model, need to confirm if FK should be UUID or INTEGER based on actual marketers table primary key type. Assuming INTEGER based on Marketer model init.
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "marketers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyId: {
        // Assuming this should be unique based on common practice, though not explicitly unique in Employer model indexes
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      registrationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      verificationDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      verifiedBy: {
        // Assuming this stores a user ID or similar, UUID for consistency with User ID type
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "users", key: "id" }, // Assuming verifiedBy refers to a User
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.createTable("employees", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        // FK to Users (UUID)
        type: Sequelize.UUID,
        allowNull: false,
        unique: true, // 1-to-1 with User
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      employerId: {
        // FK to Employers (UUID)
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "employers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      kycStage: {
        type: Sequelize.ENUM("none", "level_1", "level_2", "full"), // Match KycStage enum
        allowNull: false,
        defaultValue: "none",
      },
      kycStatus: {
        type: Sequelize.ENUM(
          "pending",
          "submitted",
          "in_review",
          "approved",
          "rejected",
          "needs_info",
          "expired",
        ), // Match KycStatus enum
        allowNull: false,
        defaultValue: "pending",
      },
      kycSubmittedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      kycReviewedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      kycReviewerId: {
        // FK to Users (UUID)
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "users", key: "id" }, // Assuming reviewer is a User
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      kycNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      salary: {
        type: Sequelize.DECIMAL(20, 0), // Match model type
        allowNull: true,
      },
      registrationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.createTable("advances", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      employeeId: {
        // FK to Employees (UUID)
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "employees", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      amount: {
        type: Sequelize.DECIMAL(20, 0), // Match model type
        allowNull: false,
      },
      repaymentAmount: {
        type: Sequelize.DECIMAL(20, 0), // Match model type
        allowNull: false,
      },
      requestDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      approvalDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      paymentDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          "PENDING",
          "APPROVED",
          "REJECTED",
          "PAID",
          "REPAID",
          "DEFAULTED",
        ), // Match AdvanceStatus enum
        allowNull: false,
        defaultValue: "PENDING",
      },
      transactionHash: {
        type: Sequelize.STRING(66), // Match model length and type
        allowNull: true,
      },
      repaymentTransactionHash: {
        type: Sequelize.STRING(66), // Match model length and type
        allowNull: true,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.createTable("liquidity_pool", {
      // Match tableName in model
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      employerId: {
        // FK to Employers (UUID)
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "employers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      amount: {
        type: Sequelize.DECIMAL(20, 0), // Match model type
        allowNull: false,
      },
      transactionType: {
        type: Sequelize.ENUM(
          "CONTRIBUTION",
          "WITHDRAWAL",
          "ADVANCE_FUNDING",
          "REPAYMENT",
        ), // Match PoolTransactionType enum
        allowNull: false,
      },
      transactionHash: {
        type: Sequelize.STRING(66), // Match model length and type
        allowNull: false,
        unique: true, // Match unique index in model
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.createTable("invitations", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      targetEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senderUserId: {
        // FK to Users (UUID)
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      recipientUserId: {
        // FK to Users (UUID), nullable
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pending", "accepted", "rejected", "expired"), // Match model enum
        defaultValue: "pending",
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("EMPLOYER", "EMPLOYEE"), // Match model enum
        allowNull: false,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Add composite unique constraint for invitations (sender + target email) if needed, although it's not in the model init
    // await queryInterface.addConstraint("invitations", {
    //   fields: ["senderUserId", "targetEmail"],
    //   type: "unique",
    //   name: "invitations_senderUserId_targetEmail_unique_key",
    // });

    await queryInterface.createTable("demo_requests", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contactName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Assuming unique based on common sense, though not explicitly in model init or indexes
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companySize: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          // Match model enum
          "PENDING",
          "CONTACTED",
          "SCHEDULED",
          "COMPLETED",
          "CANCELLED",
        ),
        allowNull: false,
        defaultValue: "PENDING",
      },
      scheduledDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation to handle foreign key dependencies
    await queryInterface.dropTable("demo_requests");
    // await queryInterface.removeConstraint("invitations", "invitations_senderUserId_targetEmail_unique_key"); // Remove constraint if added in up
    await queryInterface.dropTable("invitations");
    await queryInterface.dropTable("liquidity_pool"); // Match tableName
    await queryInterface.dropTable("advances");
    await queryInterface.dropTable("employees");
    await queryInterface.dropTable("employers");
    await queryInterface.dropTable("marketers");
    await queryInterface.dropTable("users");
  },
};
