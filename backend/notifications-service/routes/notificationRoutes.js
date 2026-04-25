const express = require("express");
const router = express.Router();

const { create, getByUser, markRead } = require("../controllers/notController");

router.post("/", create);
router.get("/:userId", getByUser);
router.patch("/:id/read", markRead);

module.exports = router;
