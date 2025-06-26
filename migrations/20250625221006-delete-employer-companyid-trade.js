"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("employers", "companyId");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("employers", "companyId", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
  },
};
