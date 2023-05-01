const express = require("express");
const { verifyAdmin } = require("../../middleware/VerifyAdmin");
const {
  getAllOrder,
  updateOrder,
} = require("../../controllers/OrderController");

const router = express.Router();

router.get("/", verifyAdmin, getAllOrder);
router.put("/update/:id", verifyAdmin, updateOrder);
module.exports = router;
