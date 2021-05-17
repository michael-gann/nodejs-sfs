const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// const routes = require("./routes");
const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

module.exports = app;
