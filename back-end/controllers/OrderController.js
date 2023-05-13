const Order = require("../models/Order");
var nodemailer = require("nodemailer");

const OrderDetail = require("../models/OrderDetail");
const User = require("../models/User");
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

exports.checkout = async (req, res, next) => {
  const userId = req.userId;
  const { addressId, shippingAmount, paymentMethod } = req.body;
  const status = "Pending";
  const user = await User.findById(userId);
  let curCart = user.cart;
  const mailOptions = {
    from: '"Tech Store "<techstore1121@gmail.com>',
    to: user.email,
    subject: "Checkout successfully",
    html: `<h1>Please check your order <a href="http://localhost:3000/checkorder">here!</a></h1>`,
  };

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
      paymentMethod,
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

    try {
      transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({
      success: true,
      message: "checkout success",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "failed",
    });
  }
};

exports.getAllOrderByStatus = async (req, res) => {
  const status = req.params.status;
  try {
    const listOrder = await Order.find({
      Status: status,
    })
      .populate(["detail.product", "user", "address"])
      .sort({ createdAt: -1 });

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
    const listOrder = await Order.find({})
      .populate(["detail.product", "user", "address"])
      .sort({ createdAt: -1 });
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
  const listStatus = ["pending", "confirmed", "shipping", "completed"];
  let status = "";

  try {
    const curOrder = await Order.findById(orderId);
    for (let i = 0; i < listStatus.length; i++) {
      if (curOrder.Status == listStatus[i]) {
        status = listStatus[i + 1];
      }
    }
    if (status == "completed") {
      await Order.findByIdAndUpdate(orderId, {
        Status: status,
        paid: true,
      });
    }
    await Order.findByIdAndUpdate(orderId, {
      Status: status,
    });
    const newListOrder = await Order.find().populate([
      "detail.product",
      "user",
      "address",
    ]);
    res.status(200).json({
      success: true,
      message: `update order success `,
      data: newListOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `fail to update order`,
    });
  }
};

exports.cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.userId;
  try {
    await Order.findByIdAndUpdate(orderId, {
      Status: "cancelled",
    });
    const newListOrder = await Order.find({ user: userId })
      .populate(["detail.product", "user", "address"])
      .sort({
        createdAt: -1,
      });
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

exports.getOrderByStatus = async (req, res) => {
  const status = req.params.status;
  const userId = req.userId;
  try {
    const listOrder = await Order.find({
      Status: status,
      user: userId,
    })
      .populate("detail.product")
      .sort({ createdAt: -1 });

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

exports.getAllUserOrder = async (req, res) => {
  const userId = req.userId;
  try {
    const listOrder = await Order.find({
      user: userId,
    })
      .populate(["detail.product", "user", "address"])
      .sort({ createdAt: -1 });

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

exports.updatePaidOrder = async (req, res) => {
  const { orderId, paid } = req.body;
  try {
    await Order.findByIdAndUpdate(orderId, { paid: paid });

    res.status(200).json({
      success: true,
      message: "update pay success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "update pay failed",
    });
  }
};
