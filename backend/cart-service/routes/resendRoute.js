const express = require("express");
const router = express.Router();

const { sendResults } = require("../controller/sendResultsController");

router.post("/", sendResults);

module.exports = router;
