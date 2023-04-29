const express = require("express");
const { verifyAdmin } = require("../../middleware/VerifyAdmin");
const { getAllOrder } = require("../../controllers/OrderController");

const router = express.Router();

router.get("/", verifyAdmin, getAllOrder);
module.exports = router;
