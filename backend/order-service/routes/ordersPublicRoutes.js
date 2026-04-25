const express = require("express");
const { createOrder, getOrderByUser } = require("../controller/orerController");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrderByUser);

module.exports = router;
