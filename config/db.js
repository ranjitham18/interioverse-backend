
const mongoose = require("mongoose");
let uri='mongodb+srv://appuser:appuser123@cluster0.qr8n9an.mongodb.net/?appName=Cluster0'
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

module.exports = connectDB;


