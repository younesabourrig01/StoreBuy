const amqp = require("amqplib");
const notificationService = require("./notificationService");

async function consumeMessages() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");

    const channel = await connection.createChannel();

    const queue = "order_created";

    await channel.assertQueue(queue);

    console.log("Waiting for messages...");

    channel.consume(queue, async (message) => {
      if (message !== null) {
        try {
          const data = JSON.parse(message.content.toString());

          console.log("New Order Event Received:", data);

          // Create notification message
          const notificationMessage = `Your order with ID ${data.orderId} has been confirmed. Total price: $${data.totalPrice}`;

          // Save to database using the service
          await notificationService.createNotification({
            userId: data.userId,
            message: notificationMessage,
            state: "SENT",
            isRead: false,
          });

          console.log("Notification saved to DB via service");

          channel.ack(message);
        } catch (err) {
          console.error("Error processing message:", err);
        }
      }
    });
  } catch (error) {
    console.log("RabbitMQ Connection Error:", error);
  }
}

module.exports = consumeMessages;
