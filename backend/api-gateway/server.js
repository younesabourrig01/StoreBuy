const rateLimit = require("express-rate-limit");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

//rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, try again later",
  },
});

// routes
require("./routes/authRoutes")(app);
require("./routes/user/userRoutes")(app);
require("./routes/admin/productsAdmin")(app);
require("./routes/public/productsPublic")(app);
require("./routes/user/CartRoutes")(app);
require("./routes/user/favoritePublic")(app);
require("./routes/user/orderRoutes")(app);
require("./routes/admin/orderAdmin")(app);

app.listen(process.env.PORT, () => {
  console.log(`Gateway running on port ${process.env.PORT}`);
});
