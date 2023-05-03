const express = require("express");

const { verifyAdmin } = require("../../middleware/VerifyAdmin");
const {
  revenueSale,
  storeStats,
  revenueByCate,
} = require("../../controllers/DashBoardController");

const router = express.Router();

router.post("/revenuesale", verifyAdmin, revenueSale);
router.post("/stats", verifyAdmin, storeStats);
router.post("/revenueByCate", verifyAdmin, revenueByCate);

module.exports = router;
