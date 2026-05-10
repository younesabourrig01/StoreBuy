const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const internalAuth = require("../common/internalAuth");

const favoriteRoutes = require("./routes/favoritRoutes");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(internalAuth);

//routes
app.use("/api/user/favorite", favoriteRoutes);

module.exports = app;
