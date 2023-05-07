const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const {
  createRate,
  editRate,
  delRate,
  getAllProductRate,
} = require("../controllers/RateController");

const router = express.Router();

router.get("/:productId", getAllProductRate);
router.post("/create", verifyToken, createRate);
router.put("/update/:id", verifyToken, editRate);
router.delete("/delete/:productId/:id", verifyToken, delRate);

module.exports = router;
