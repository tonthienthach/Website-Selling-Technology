const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { name, username, password, email } = req.body;
    const userExist = await User.find({ username: username });
    const emailExist = await User.find({ email: email });
    console.log(userExist);
    if (userExist.length !== 0) {
      return res.status(200).json({
        success: false,
        message: "Username already exists",
      });
    }
    if (emailExist.length !== 0) {
      return res.status(200).json({
        success: false,
        message: "Email already exists",
      });
    }
    const newUser = new User(req.body);
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.TOKEN_SECRET_KEY
    );
    res.status(200).json({
      success: true,
      message: "Register successfully",
      token: token,
      username: req.username,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "REgister failed",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const userLogin = await User.findOne({
      username: req.body.username,
    }).populate("vouchers.voucher");

    if (!userLogin || !userLogin.status) {
      return res.status(200).json({
        success: false,
        message: "no user found",
      });
    }

    if (req.body.password == userLogin.password) {
      const token = jwt.sign(
        { userId: userLogin._id, isAdmin: userLogin.admin },
        process.env.TOKEN_SECRET_KEY
      );
      res.status(200).json({
        user: userLogin,
        success: true,
        message: "login successfully",
        token: token,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "wrong pass",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "login failed",
    });
  }
};
exports.getInfoUser = async (req, res, next) => {
  const userId = req.userId;
  try {
    const curUser = await User.findById(userId);
    res.status(200).json({
      success: true,
      data: curUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "failed to get info user",
    });
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    // await User.updateMany({}, { $set: { status: true } });
    const listUser = await User.find({ status: true });
    res.status(200).json({
      success: true,
      data: listUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "failed to get info user",
    });
  }
};

exports.delUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, { status: false });
    const listUser = await User.find({ status: true });
    res.status(200).json({
      success: true,
      message: "remove user success",
      data: listUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "failed remove user",
    });
  }
};
