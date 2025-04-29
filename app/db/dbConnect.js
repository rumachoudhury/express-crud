const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB;

const connectToDB = async () => {
  await mongoose
    .connect(uri)
    .then(() => {
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });
};

module.exports = connectToDB;
