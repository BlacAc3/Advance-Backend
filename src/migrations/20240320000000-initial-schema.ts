import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Users table
  await queryInterface.createTable('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        is: /^0x[a-fA-F0-9]{40}$/
      }
    },
    role: {
      type: DataTypes.ENUM('EMPLOYER', 'EMPLOYEE', 'WEB3_USER', 'ADMIN'),
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  // Employers table
  await queryInterface.createTable('Employers', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyWebsite: {
      type: DataTypes.STRING,
      allowNull: true
    },
    companySize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verificationDocuments: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  // Employees table
  await queryInterface.createTable('Employees', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    employerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Employers',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    payFrequency: {
      type: DataTypes.ENUM('WEEKLY', 'BIWEEKLY', 'MONTHLY'),
      allowNull: false
    },
    nextPayDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    employmentStartDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    employmentEndDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  // Advance Requests table
  await queryInterface.createTable('AdvanceRequests', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Employees',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'PAID', 'CANCELLED'),
      defaultValue: 'PENDING'
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    repaymentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    approvedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  // Staking Pools table
  await queryInterface.createTable('StakingPools', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tokenAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^0x[a-fA-F0-9]{40}$/
      }
    },
    apy: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    minStakeAmount: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false
    },
    maxStakeAmount: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    totalStaked: {
      type: DataTypes.DECIMAL(18, 8),
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  // Stakes table
  await queryInterface.createTable('Stakes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    poolId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'StakingPools',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    amount: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'WITHDRAWN', 'REWARDED'),
      defaultValue: 'ACTIVE'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rewards: {
      type: DataTypes.DECIMAL(18, 8),
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  // Add indexes
  await queryInterface.addIndex('Users', ['email']);
  await queryInterface.addIndex('Users', ['walletAddress']);
  await queryInterface.addIndex('Users', ['role']);
  await queryInterface.addIndex('Employers', ['userId']);
  await queryInterface.addIndex('Employees', ['userId']);
  await queryInterface.addIndex('Employees', ['employerId']);
  await queryInterface.addIndex('AdvanceRequests', ['employeeId']);
  await queryInterface.addIndex('AdvanceRequests', ['status']);
  await queryInterface.addIndex('Stakes', ['userId']);
  await queryInterface.addIndex('Stakes', ['poolId']);
  await queryInterface.addIndex('Stakes', ['status']);
}

export async function down(queryInterface: QueryInterface) {
  // Drop tables in reverse order
  await queryInterface.dropTable('Stakes');
  await queryInterface.dropTable('StakingPools');
  await queryInterface.dropTable('AdvanceRequests');
  await queryInterface.dropTable('Employees');
  await queryInterface.dropTable('Employers');
  await queryInterface.dropTable('Users');
} 