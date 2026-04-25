const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const internalAuth = require("../common/internalAuth");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(internalAuth);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
