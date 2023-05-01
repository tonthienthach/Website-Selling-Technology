const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
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
    }).populate("admin");
    if (!userLogin) {
      return res.status(400).json({
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
        name: req.body.username,
      });
    } else {
      res.status(400).json({
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
    const listUser = await User.find();
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
    await User.findByIdAndRemove(userId);
    const listUser = await User.find();
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
