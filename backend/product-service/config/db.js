const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_USER_DB);
    console.log("db products connescted successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
