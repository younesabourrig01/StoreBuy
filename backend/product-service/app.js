const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const internalAuth = require("../common/internalAuth");

const adminRoutes = require("./routes/adminRoutes");
const publicRoutes = require("./routes/publicRoutes");
const resendRoute = require("./routes/resendRoute");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(internalAuth);

//routes
app.use("/api/admin/products", adminRoutes);
app.use("/api/products", publicRoutes);
app.use("/api/products", resendRoute);

module.exports = app;
