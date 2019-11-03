/* eslint-disable no-console */
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const Tour = require("./../../models/tourModel");

mongoose
  .connect(process.env.DATABASE_LOCAL, {
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

// read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));

// import data into db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data loaded");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// delete all data from collection
async function deleteData() {
  try {
    await Tour.deleteMany();
    console.log("data deleted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

if (process.argv[2] === "--import") {
  importData();
}

if (process.argv[2] === "--delete") {
  deleteData();
}
