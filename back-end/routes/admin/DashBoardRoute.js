const express = require("express");

const { verifyAdmin } = require("../../middleware/VerifyAdmin");
const { revenueSale } = require("../../controllers/DashBoardController");

const router = express.Router();

router.post("/revenuesale", verifyAdmin, revenueSale);

module.exports = router;
