const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;