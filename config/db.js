const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = process.env.MONGO_URI;
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, MONGO_OPTIONS); 
    console.log("Database Connected");
  } catch (err) {
    console.log("Could not connect to MongoDB");
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;