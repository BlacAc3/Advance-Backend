"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("employers", "marketerId", {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: "marketers", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("employers", "marketerId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "marketers", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
};
