"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Creditor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // const columnMapping = {
      //   through: models.Creditor_Debtor,
      //   // as: "Owed",
      //   foreignKey: "creditorId",
      //   otherKey: "debtorId",
      // };

      // Creditor.belongsToMany(models.Debtor, columnMapping);
      Creditor.hasMany(models.Creditor_Debtor, { foreignKey: "creditorId" });
    }
  }
  Creditor.init(
    {
      institution: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Creditor",
    }
  );
  return Creditor;
};
