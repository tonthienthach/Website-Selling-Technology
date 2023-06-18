const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const {
  getUserInfo,
  updateUserInfo,
  changePassword,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/info", verifyToken, getUserInfo);

router.put("/update", verifyToken, updateUserInfo);

router.put("/changepassword", verifyToken, changePassword);

module.exports = router;
