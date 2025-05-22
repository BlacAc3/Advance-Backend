import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn('users', 'wallet_data', {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Encrypted wallet data including private key and address'
  });

  // Add an index on wallet_data for faster lookups
  await queryInterface.addIndex('users', ['wallet_data'], {
    name: 'idx_users_wallet_data',
    using: 'GIN' // GIN index for JSONB data
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Remove the index first
  await queryInterface.removeIndex('users', 'idx_users_wallet_data');
  
  // Remove the column
  await queryInterface.removeColumn('users', 'wallet_data');
} 