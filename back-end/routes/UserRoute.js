const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const {
  getUserInfo,
  updateUserInfo,
  changePassword,
  collectVoucher,
  createAllUser,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/info", verifyToken, getUserInfo);

router.put("/update", verifyToken, updateUserInfo);

router.put("/changepassword", verifyToken, changePassword);

router.get("/collectvoucher/:voucherId", verifyToken, collectVoucher);

// router.get("/create-all-user", createAllUser);

module.exports = router;
