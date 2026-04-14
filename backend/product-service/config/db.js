const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_PRODUCTS_DB);
    console.log("db products connescted successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
