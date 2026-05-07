const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");

    channel = await connection.createChannel();

    console.log("RabbitMQ connected in Order Service");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ in Order Service:", error.message);
  }
}

function getChannel() {
  if (!channel) {
    console.error("RabbitMQ channel not initialized!");
  }
  return channel;
}

module.exports = {
  connectRabbitMQ,
  getChannel,
};

