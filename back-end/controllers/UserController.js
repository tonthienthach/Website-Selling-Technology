const User = require("../models/User");
const Voucher = require("../models/Voucher");
const fs = require("fs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // config mail server
  service: "Gmail",
  secure: false,
  auth: {
    user: "techstore1121@gmail.com",
    pass: "ukpgyivujfgzlmxj",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.getUserInfo = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate("vouchers.voucher");
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
    const user = await User.findById(userId).populate("vouchers.voucher");
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
    const user = await User.findById(userId).populate("vouchers.voucher");
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

exports.forgetPassword = async (req, res) => {
  const username = req.body.username;
  try {
    const user = await User.findOne({ username });
    const newPassword = crypto
      .randomBytes(Math.ceil(8 / 2))
      .toString("hex")
      .slice(0, 8);
    user.password = newPassword;
    await user.save();
    const mailOptions = {
      from: '"Tech Store "<techstore1121@gmail.com>',
      to: user.email,
      subject: "Reset password",
      html: `
    <h1>Please don't provide this password to anyone </>
    <h2>Your new password is: ${newPassword}</h2>`,
    };
    transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "newpassword has been send to your mail",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "forget password err",
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
