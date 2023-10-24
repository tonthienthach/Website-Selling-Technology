const express = require("express");
const {
  getAllVoucher,
  createVoucher,
  updateVoucherStatus,
  getVoucherAvailable,
} = require("../controllers/VoucherController");
const { verifyAdmin } = require("../middleware/VerifyAdmin");

const router = express.Router();

router.get("/", getVoucherAvailable);
router.get("/all", verifyAdmin, getAllVoucher);
router.post("/create", verifyAdmin, createVoucher);
router.put("/changeStatus/:voucherId", verifyAdmin, updateVoucherStatus);

module.exports = router;
