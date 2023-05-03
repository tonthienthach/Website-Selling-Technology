const express = require("express");

const { verifyAdmin } = require("../../middleware/VerifyAdmin");
const {
  revenueSale,
  storeStats,
} = require("../../controllers/DashBoardController");

const router = express.Router();

router.post("/revenuesale", verifyAdmin, revenueSale);
router.post("/stats", verifyAdmin, storeStats);

module.exports = router;
