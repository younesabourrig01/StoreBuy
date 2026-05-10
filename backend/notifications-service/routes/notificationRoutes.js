const express = require("express");
const router = express.Router();

const { create, getMyNotifications, getByUser, markRead } = require("../controllers/notController");

router.post("/", create);
router.get("/", getMyNotifications);
router.get("/:userId", getByUser);
router.patch("/:id/read", markRead);

module.exports = router;
