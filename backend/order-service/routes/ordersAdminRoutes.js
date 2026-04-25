const express = require("express");
const { getAllOrders } = require("../controller/orerController");

const router = express.Router();

router.get("/", getAllOrders);

module.exports = router;
