require("dotenv").config();
const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bqq68oc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const connectToDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

module.exports = connectToDB;
