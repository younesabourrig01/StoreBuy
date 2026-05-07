const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const { register, login, logout } = require("../controllers/authController");

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
