const Order = require("../models/Order");

const OrderDetail = require("../models/OrderDetail");
const User = require("../models/User");

exports.checkout = async (req, res, next) => {
  const userId = req.userId;
  const { addressId, shippingAmount } = req.body;
  const status = "Pending";
  const user = await User.findById(userId);
  let curCart = user.cart;

  if (curCart.length === 0) {
    return res.status(400).json({
      message: "cart is empty",
    });
  }

  try {
    let total = 0;
    for (let i = 0; i < curCart.length; i++) {
      total += curCart[i].price * curCart[i].quantity;
    }
    total += shippingAmount;
    const detail = curCart.map((cart) => ({
      product: cart.id,
      quantity: cart.quantity,
    }));

    const newOrder = new Order({
      user: userId,
      address: addressId,
      status,
      detail,
      shippingAmount,
      total,
    });

    await newOrder.save();
    console.log(newOrder);
    // for (let i = 0; i < curCart.length; i++) {
    //   await OrderDetail.create({
    //     order: newOrder._id,
    //     product: curCart[i].id,
    //     quantity: curCart[i].quantity,
    //     color: curCart[i].color,
    //   });
    // }
    let emptyCart = [];
    await User.findByIdAndUpdate(userId, {
      cart: emptyCart,
    });
    res.status(200).json({
      success: true,
      message: "checkout success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "failed",
    });
  }
};

exports.getOrderByStatus = async (req, res) => {
  const status = req.params.status;
  const userId = req.userId;
  try {
    const listOrder = await Order.find({
      Status: status,
      user: userId,
    }).populate("detail.product");

    res.status(200).json({
      success: true,
      data: listOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `fail to get list order ${status}`,
    });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const listOrder = await Order.find({}).populate([
      "detail.product",
      "user",
      "address",
    ]);
    res.status(200).json({
      success: true,
      data: listOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `fail to get list order`,
    });
  }
};

exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  try {
    await Order.findByIdAndUpdate(orderId, {
      Status: status,
    });
    const newListOrder = Order.find();
    res.status(200).json({
      success: true,
      message: `update order success `,
      data: newListOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `fail to update order`,
    });
  }
};

exports.cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  const { status } = "cancelled";
  try {
    await Order.findByIdAndUpdate(orderId, {
      Status: status,
    });
    const newListOrder = Order.find();
    res.status(200).json({
      success: true,
      message: `cancel order success `,
      data: newListOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `fail to cancel order`,
    });
  }
};
