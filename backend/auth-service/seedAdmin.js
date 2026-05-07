const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./model/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI_USER_DB);

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin",
      phone_number: "0607080908",
      adress: "123 Main St",
      region: "Morocco",
    });

    console.log("Admin created:", admin.email);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

createAdmin();