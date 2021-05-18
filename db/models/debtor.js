"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Debtor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const columnMapping = {
        through: models.Creditor_Debtor,
        foreignKey: "debtorId",
      };

      Debtor.belongsToMany(models.Creditor, columnMapping);
    }
  }
  Debtor.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Debtor",
    }
  );
  return Debtor;
};
