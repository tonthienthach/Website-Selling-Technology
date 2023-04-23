const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const {
  addAddress,
  getUserAddress,
} = require("../controllers/AddressController");

const router = express.Router();

router.post("/addAddress", verifyToken, addAddress);

router.get("/getUserAddress", verifyToken, getUserAddress);

module.exports = router;
