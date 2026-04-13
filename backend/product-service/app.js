const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//routes
app.use("/api/admin/products", adminRoutes);
app.use("/api/products", publicRoutes);

module.exports = app;
