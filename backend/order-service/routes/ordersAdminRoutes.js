const express = require("express");
const { getAllOrders } = require("../controller/orderController");

const router = express.Router();

router.get("/", getAllOrders);

module.exports = router;
