const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
