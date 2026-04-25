const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const internalAuth = require("../common/internalAuth");

const ordersPublicRoutes = require("./routes/ordersPublicRoutes");
const orderAdminRoutes = require("./routes/ordersAdminRoutes");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(internalAuth);

//routes
app.use("/api/user/orders", ordersPublicRoutes);
app.use("/api/user/orders/admin", orderAdminRoutes);

module.exports = app;
