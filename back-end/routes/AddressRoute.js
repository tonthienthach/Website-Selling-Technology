const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const {
  addAddress,
  getUserAddress,
  delUserAddress,
} = require("../controllers/AddressController");

const router = express.Router();

router.post("/addAddress", verifyToken, addAddress);

router.get("/getUserAddress", verifyToken, getUserAddress);

router.delete("/delUserAddress/:addressId", verifyToken, delUserAddress);

module.exports = router;
