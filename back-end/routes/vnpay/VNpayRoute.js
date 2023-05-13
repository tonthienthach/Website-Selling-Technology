const express = require("express");
const { vnpayPayment } = require("../../controllers/vnpay/VNpayController");

const router = express.Router();

router.post("/vnpay-payment", vnpayPayment);

module.exports = router;
