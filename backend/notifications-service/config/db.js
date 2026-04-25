const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_NOTIFICATIONS_DB);
    console.log("db notifications connected successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
