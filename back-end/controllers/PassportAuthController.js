require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.LoginSuccess = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId).populate("vouchers.voucher");
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.admin },
      process.env.TOKEN_SECRET_KEY
    );
    res.status(200).json({
      user: user,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "login failed" + error,
    });
  }
};
