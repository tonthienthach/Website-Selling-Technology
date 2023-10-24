const express = require("express");
const {
  getAllVoucher,
  createVoucher,
  updateVoucherStatus,
} = require("../controllers/VoucherController");
const { verifyAdmin } = require("../middleware/VerifyAdmin");

const router = express.Router();

router.get("/", verifyAdmin, getAllVoucher);
router.post("/create", verifyAdmin, createVoucher);
router.put("/changeStatus/:voucherId", verifyAdmin, updateVoucherStatus);

module.exports = router;
