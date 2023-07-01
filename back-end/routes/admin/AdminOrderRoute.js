const express = require("express");
const { verifyAdmin } = require("../../middleware/VerifyAdmin");
const {
  getAllOrder,
  updateOrder,
  getAllOrderByStatus,
  cancelOrderAdmin,
} = require("../../controllers/OrderController");

const router = express.Router();

router.get("/", verifyAdmin, getAllOrder);
router.put("/update/:id", verifyAdmin, updateOrder);
router.get("/:status", verifyAdmin, getAllOrderByStatus);
router.put("/cancel/:id", verifyAdmin, cancelOrderAdmin);
module.exports = router;
