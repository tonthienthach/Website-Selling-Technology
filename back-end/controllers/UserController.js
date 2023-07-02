const User = require("../models/User");

exports.getUserInfo = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "can not get userinfo!",
    });
  }
};

exports.updateUserInfo = async (req, res) => {
  const userId = req.userId;
  const { name, avatar, email } = req.body;
  try {
    await User.findByIdAndUpdate(userId, {
      name,
      avatar,
      email,
    });
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "can not update userinfo!",
    });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.userId;
  const { oldPassword, newPassword, retypePassword } = req.body;
  try {
    const user = await User.findById(userId);
    {
      if (user.password === oldPassword) {
        if (newPassword === retypePassword) {
          user.password = newPassword;
          await user.save();
          return res.status(200).json({
            success: true,
            data: user,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "retype password does not match new password",
          });
        }
      } else {
        return res.status(200).json({
          success: false,
          message: "current password is not correct",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "change password err",
    });
  }
};
