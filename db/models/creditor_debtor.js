"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Creditor_Debtor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Creditor_Debtor.belongsTo(models.Creditor, { foreignKey: "creditorId" });
      Creditor_Debtor.belongsTo(models.Debtor, { foreignKey: "debtorId" });
    }
  }
  Creditor_Debtor.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      creditorId: DataTypes.INTEGER,
      debtorId: DataTypes.INTEGER,
      balance: DataTypes.INTEGER,
      minPaymentPercentage: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Creditor_Debtor",
    }
  );
  return Creditor_Debtor;
};
