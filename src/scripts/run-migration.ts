import { sequelize } from '../config/database';
import { logger } from '../utils/logger';

async function runMigration() {
  try {
    // Run the migration
    await sequelize.getQueryInterface().addColumn('users', 'wallet_data', {
      type: 'JSONB',
      allowNull: true,
      comment: 'Encrypted wallet data including private key and address'
    });

    // Add the GIN index
    await sequelize.getQueryInterface().addIndex('users', ['wallet_data'], {
      name: 'idx_users_wallet_data',
      using: 'GIN'
    });

    logger.info('Successfully added wallet_data column and index to users table');
    process.exit(0);
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
runMigration(); 