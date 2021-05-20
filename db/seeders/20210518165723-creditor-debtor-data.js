"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Creditor_Debtors",
      [
        {
          creditorId: 1,
          debtorId: 1,
          balance: 136300,
          minPaymentPercentage: 20,
        },
        {
          creditorId: 2,
          debtorId: 1,
          balance: 276300,
          minPaymentPercentage: 20,
        },
        {
          creditorId: 2,
          debtorId: 1,
          balance: 42900,
          minPaymentPercentage: 20,
        },
        {
          creditorId: 2,
          debtorId: 1,
          balance: 136300,
          minPaymentPercentage: 20,
        },
        {
          creditorId: 3,
          debtorId: 1,
          balance: 264400,
          minPaymentPercentage: 20,
        },
        {
          creditorId: 4,
          debtorId: 1,
          balance: 546400,
          minPaymentPercentage: 40,
        },
        {
          creditorId: 4,
          debtorId: 1,
          balance: 234500,
          minPaymentPercentage: 40,
        },
        {
          creditorId: 4,
          debtorId: 1,
          balance: 83600,
          minPaymentPercentage: 40,
        },
        {
          creditorId: 1,
          debtorId: 1,
          balance: 68700,
          minPaymentPercentage: 35,
        },
        {
          creditorId: 1,
          debtorId: 1,
          balance: 23500,
          minPaymentPercentage: 35,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Creditor_Debtors", null, {});
  },
};
