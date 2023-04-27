const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const {
  checkout,
  getOrderByStatus,
} = require("../controllers/OrderController");

const router = express.Router();

router.post("/checkout", verifyToken, checkout);
// router.post("/update", updateOrder);
router.get("/:status", verifyToken, getOrderByStatus);
module.exports = router;
