require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT;

const startServeer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Auth Server running on port ${PORT}`);
  });
};

startServeer();
