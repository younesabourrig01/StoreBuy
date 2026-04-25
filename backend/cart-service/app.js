const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const internalAuth = require("../common/internalAuth");

const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(internalAuth);

app.use("/api/user/cart", cartRoutes);

module.exports = app;
