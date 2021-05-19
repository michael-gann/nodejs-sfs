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
          minPaymentPercentage: 200,
        },
        {
          creditorId: 2,
          debtorId: 1,
          balance: 276300,
          minPaymentPercentage: 200,
        },
        {
          creditorId: 2,
          debtorId: 1,
          balance: 42900,
          minPaymentPercentage: 200,
        },
        {
          creditorId: 2,
          debtorId: 1,
          balance: 136300,
          minPaymentPercentage: 200,
        },
        {
          creditorId: 3,
          debtorId: 1,
          balance: 264400,
          minPaymentPercentage: 200,
        },
        {
          creditorId: 4,
          debtorId: 1,
          balance: 546400,
          minPaymentPercentage: 400,
        },
        {
          creditorId: 4,
          debtorId: 1,
          balance: 234500,
          minPaymentPercentage: 400,
        },
        {
          creditorId: 4,
          debtorId: 1,
          balance: 83600,
          minPaymentPercentage: 400,
        },
        {
          creditorId: 1,
          debtorId: 1,
          balance: 68700,
          minPaymentPercentage: 350,
        },
        {
          creditorId: 1,
          debtorId: 1,
          balance: 23500,
          minPaymentPercentage: 350,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Creditor_Debtors", null, {});
  },
};
