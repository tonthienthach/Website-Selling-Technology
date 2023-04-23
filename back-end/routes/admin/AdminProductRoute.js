const express = require("express");
const {
  createProduct,
  updateProduct,
  delProduct,
} = require("../../controllers/ProductController");
const { verifyAdmin } = require("../../middleware/VerifyAdmin");

const router = express.Router();

router.post("/create", verifyAdmin, createProduct);

router.put("/update/:id", verifyAdmin, updateProduct);
router.delete("/delete/:id", verifyAdmin, delProduct);

module.exports = router;
