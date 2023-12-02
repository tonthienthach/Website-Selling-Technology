const User = require("../models/User");
const Voucher = require("../models/Voucher");
const fs = require("fs");

exports.getUserInfo = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      user: user,
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
      user: user,
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

exports.collectVoucher = async (req, res) => {
  const voucherId = req.params.voucherId;
  const userId = req.userId;
  const voucher = await Voucher.findById(voucherId);
  const user = await User.findById(userId);
  var listUserVoucher = user.vouchers;

  try {
    if (listUserVoucher.length === 0) {
      listUserVoucher.push({
        voucher,
      });
    } else {
      var newItem = true;
      for (let i = 0; i < listUserVoucher.length; i++) {
        if (listUserVoucher[i].voucher == voucherId) {
          newItem = false;
          break;
        }
      }
      if (newItem) {
        listUserVoucher.push({
          voucher,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "you have already collect this voucher",
        });
      }
    }

    user.vouchers = listUserVoucher;
    await user.save();

    await Voucher.findByIdAndUpdate(voucherId, {
      quantity: voucher.quantity - 1,
    });

    var updateUser = await User.findById(userId).populate("vouchers.voucher");
    res.status(200).json({
      success: true,
      data: { user: updateUser },
      message: "collect voucher successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `collect voucher failed! ${error}`,
    });
  }
};

// exports.createAllUser = async (req, res) => {
//   let data = [];
//   fs.readFile("./data.json", "utf-8", async (err, returnData) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     data = JSON.parse(returnData);

//     data.forEach(async (user) => {
//       const newUser = new User(user);
//       await newUser.save();
//     });
//   });
// };
