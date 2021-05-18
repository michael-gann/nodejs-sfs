"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Creditors",
      [
        {
          institution: "CBNA",
        },
        {
          institution: "AMEX",
        },
        {
          institution: "DISCOVERBANK",
        },
        {
          institution: "CAPITAL ONE",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Creditor", null, {});
  },
};
