const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const {
  checkout,
  getOrderByStatus,
  cancelOrder,
  getAllOrder,
  getAllUserOrder,
  updatePaidOrder,
} = require("../controllers/OrderController");
const { verify } = require("jsonwebtoken");

const router = express.Router();

router.post("/checkout", verifyToken, checkout);
// router.post("/update", updateOrder);
router.get("/:status", verifyToken, getOrderByStatus);
router.put("/cancel/:id", verifyToken, cancelOrder);
router.get("/", verifyToken, getAllUserOrder);
router.put("/updatePaid", verifyToken, updatePaidOrder);
module.exports = router;
