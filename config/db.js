// connects mongoDB using mongoose
// keeps DB logic separate
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/interioverse");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

module.exports = connectDB;
