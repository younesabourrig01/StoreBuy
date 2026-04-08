const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  updatePassword,
  updateUserInfo,
  deleteUser,
  userProfile,
} = require("../controllers/authController");

router.get("/profile", userProfile);
router.put("/update", upload.single("image"), updateUserInfo);
router.put("/update-password", updatePassword);
router.delete("/delete", deleteUser);

module.exports = router;
