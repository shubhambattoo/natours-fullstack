/* eslint-disable no-console */
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

process.on("uncaughtException", err => {
  console.log("Unhandler Exception! Shutting Down...");
  console.log(err.name, err.message);
  process.exit(1);
});

let dbUrl = process.env.DATABASE_HOST + process.env.DATABASE_NAME;

if (process.env.NODE_ENV === "production") {
  dbUrl = process.env.DATABASE_HOST;
}

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("db connected successfully");
  })
  .catch(err => {
    console.log(err);
  });

const app = require("./app");

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`server started on ${port}`);
});

process.on("unhandledRejection", err => {
  console.log("Unhandler Rejection! Shutting Down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED! Shutting Down...");
  server.close(() => {
    console.log("Process Terminated.");
  });
});
