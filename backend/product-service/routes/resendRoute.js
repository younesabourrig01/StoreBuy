const express = require("express");
const router = express.Router();

const { sendResults } = require("../controller/sendResultsController");

router.post("/bulk", sendResults);

module.exports = router;
