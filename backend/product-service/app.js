const morgan = require("morgan");
const express = require("express");
const express = require("cors");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//routes
app.use("/api/admin/products");
app.use("/api/public/products");

module.exports = app;
