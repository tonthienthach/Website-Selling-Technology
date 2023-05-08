const Rate = require("../models/Rate");
const Order = require("../models/Order");

exports.createRate = async (req, res) => {
  const userId = req.userId;
  const { product, content, score } = req.body;
  const listOrder = await Order.find({ user: userId });
  let availableCreate = false;
  listOrder.forEach((order) => {
    order.detail.forEach((detail) => {
      if (detail.product == product) {
        availableCreate = true;
      }
    });
  });

  try {
    if (availableCreate) {
      const newRate = new Rate({ user: userId, product, content, score });
      await newRate.save();
      const newlistRate = await Rate.find({ product }).sort({ createdAt: -1 });
      const totalRate = await Rate.find({ product }).count();
      res.status(200).json({
        success: true,
        data: newlistRate,
        total: totalRate,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "You have not purchased this product yet",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "create rate failed",
    });
  }
};

exports.editRate = async (req, res) => {
  const userId = req.userId;
  const rateId = req.params.id;
  const { product, content, score } = req.body;

  try {
    await Rate.findOneAndUpdate(
      { _id: rateId, user: userId },
      { content, score }
    );
    const newlistRate = await Rate.find({ product }).sort({ createdAt: -1 });
    const totalRate = await Rate.find({ product }).count();
    res.status(200).json({
      success: true,
      data: newlistRate,
      total: totalRate,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "edit rate failed",
    });
  }
};

exports.delRate = async (req, res) => {
  const userId = req.userId;
  const product = req.params.productId;
  const rateID = req.params.id;

  try {
    await Rate.findOneAndRemove({ _id: rateID, user: userId });
    const newlistRate = await Rate.find({ product }).sort({ createdAt: -1 });
    const totalRate = await Rate.find({ product }).count();
    res.status(200).json({
      success: true,
      data: newlistRate,
      total: totalRate,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "edit rate failed",
    });
  }
};

exports.getAllProductRate = async (req, res) => {
  const product = req.params.productId;
  const newlistRate = await Rate.find({ product }).sort({ createdAt: -1 });
  const totalRate = await Rate.find({ product }).count();
  console.log(newlistRate);
  res.status(200).json({
    success: true,
    message: "success",
    data: newlistRate,
    total: totalRate,
  });
};
