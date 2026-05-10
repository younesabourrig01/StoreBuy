const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_CART_DB);
    console.log("db cart connected successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
