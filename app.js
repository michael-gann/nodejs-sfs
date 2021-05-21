const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const serverless = require("serverless-http");

const routes = require("./routes");
const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

app.get("/test", async function (req, res) {
  let msg;
  try {
    msg = process.env.DB_HOST;
  } catch (error) {
    msg = "Unable to connect to the database:";
    console.error("Unable to connect to the database:", error);
  }

  return res.send({ message: msg, thing1: "hi" });
});

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports.index = serverless(app);

module.exports.baseApp = app;
