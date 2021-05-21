const config = require("./index");

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
  development: {
    use_env_variable: "DB_URL",
    dialect: "postgres",
    protocol: "postgres",
    seederStorage: "sequelize",
  },
  production: {
    use_env_variable: "DB_URL",
    dialect: "postgres",
    seederStorage: "sequelize",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
