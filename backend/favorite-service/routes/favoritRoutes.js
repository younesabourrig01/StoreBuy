const express = require("express");
const { addToFav, removeFav, getFav } = require("../controllers/favController");
const router = express.Router();

router.post("/", addToFav);
router.get("/", getFav);
router.delete("/:product_id", removeFav);

module.exports = router;
