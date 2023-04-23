const {
  register,
  login,
  getInfoUser,
} = require("../controllers/AuthenController");

const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/info", verifyToken, getInfoUser);

module.exports = router;
