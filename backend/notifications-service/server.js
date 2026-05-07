require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./config/db");
const consumeMessages = require("./services/rabbitmq");

const PORT = process.env.PORT;

consumeMessages();

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Notifications Server running on port ${PORT}`);
  });
};

startServer();
