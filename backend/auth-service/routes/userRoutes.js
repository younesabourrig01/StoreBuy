const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const authMiddleware = require("../middlewares/authMiddleware");

const {
  updatePassword,
  updateUserInfo,
  deleteUser,
  userProfile,
} = require("../controllers/authController");

router.get("/profile", authMiddleware, userProfile);
router.put("/update", authMiddleware, upload.single("image"), updateUserInfo);
router.put("/update-password", authMiddleware, updatePassword);
router.delete("/delete", authMiddleware, deleteUser);

module.exports = router;
