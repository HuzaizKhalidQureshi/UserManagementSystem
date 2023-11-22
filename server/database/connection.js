const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_DB_URL, {});
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
