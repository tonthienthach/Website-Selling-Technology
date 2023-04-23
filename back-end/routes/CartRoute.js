const express = require("express");

const { verifyToken } = require("../middleware/VerifyToken");
const {
  addToCart,
  updateCart,
  delCartItem,
  getItemInCart,
  increaseCart,
  decreaseCart,
} = require("../controllers/CartController");

const router = express.Router();

router.post("/addToCart/:id", verifyToken, addToCart);

router.put("/updateCart/:id", verifyToken, updateCart);

router.put("/increaseCart/:id", verifyToken, increaseCart);

router.put("/decreaseCart/:id", verifyToken, decreaseCart);

router.delete("/deleteCart/:id", verifyToken, delCartItem);

router.get("/", verifyToken, getItemInCart);

module.exports = router;
