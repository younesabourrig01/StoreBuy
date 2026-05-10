const express = require("express");
const router = express.Router();

const { sendResults } = require("../controllers/sendResultsController");

router.get("/", sendResults);

module.exports = router;
