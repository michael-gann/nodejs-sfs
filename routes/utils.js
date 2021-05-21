const { Creditor, Creditor_Debtor, Debtor } = require("../db/models");

const findOrCreateDebtor = async (firstName, lastName) => {
  let debtor;

  debtor = await Debtor.findOne({
    where: {
      firstName,
      lastName,
    },
  });

  if (!debtor) {
    debtor = await Debtor.create({
      firstName,
      lastName,
    });
  }

  return debtor;
};

const findOrCreateCreditor = async (institution) => {
  let creditor;

  if (institution) {
    creditor = await Creditor.findOne({
      where: {
        institution: institution.toUpperCase(),
      },
    });
  }

  if (!creditor) {
    creditor = await Creditor.create({
      institution: institution.toUpperCase(),
    });
  }

  return creditor;
};

module.exports = { findOrCreateDebtor, findOrCreateCreditor };
