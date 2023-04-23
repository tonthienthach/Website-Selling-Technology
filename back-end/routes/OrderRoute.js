const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const { checkout } = require("../controllers/OrderController");

const router = express.Router();

router.post("/checkout", verifyToken, checkout);
// router.post("/update", updateOrder);

module.exports = router;
