require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
require("./routes/auth.routes")(app);

app.listen(process.env.PORT, () => {
  console.log(`Gateway running on port ${process.env.PORT}`);
});
