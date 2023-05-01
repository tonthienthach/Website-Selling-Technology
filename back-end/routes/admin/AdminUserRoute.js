const express = require("express");
const { verifyAdmin } = require("../../middleware/VerifyAdmin");
const {
  getAllUser,
  delUserById,
} = require("../../controllers/AuthenController");

const router = express.Router();

router.get("/", verifyAdmin, getAllUser);
router.delete("/delete/:id", verifyAdmin, delUserById);
module.exports = router;
