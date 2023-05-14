const express = require("express");
const {
  vnpayPayment,
  createRefund,
} = require("../../controllers/vnpay/VNpayController");

const router = express.Router();

router.post("/vnpay-payment", vnpayPayment);
router.post("/refund", createRefund);

module.exports = router;
