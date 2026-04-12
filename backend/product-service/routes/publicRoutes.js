const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddleware");
const upload = require("../config/multer");

const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  protect,
  authorizeRole("admin"),
  upload.single("image"),
  createProduct,
);
router.put(
  "/:id",
  protect,
  authorizeRole("admin"),
  upload.single("image"),
  updateProduct,
);
router.delete("/:id", protect, authorizeRole("admin"), deleteProduct);

module.exports = router;
