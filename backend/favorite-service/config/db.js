const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_FAVORITES_DB);
    console.log("db favorites connected successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
