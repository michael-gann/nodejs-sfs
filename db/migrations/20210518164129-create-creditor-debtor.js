"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Creditor_Debtors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      creditorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Creditors",
        },
      },
      debtorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Debtors",
        },
      },
      balance: {
        type: Sequelize.INTEGER,
      },
      minPaymentPercentage: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Creditor_Debtors");
  },
};
