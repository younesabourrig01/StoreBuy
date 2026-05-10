const app = require("./app");
require("dotenv").config();
const { connectDB } = require("./config/db");

const PORT = process.env.PORT;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Cart Server running on port ${PORT}`);
  });
};

startServer();
