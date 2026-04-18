const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  clear,
  handelQuantity,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:id", removeFromCart);
router.delete("/id", clear);
router.post("/:id", handelQuantity);

module.exports = router;
