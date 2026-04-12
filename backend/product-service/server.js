require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT;

const startServer = async () => {
  await connectDB;

  app.listen(PORT, () => {
    console.log(`Products Server running on port ${PORT}`);
  });
};

startServer();
