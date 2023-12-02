const Order = require("../models/Order");
var nodemailer = require("nodemailer");

const User = require("../models/User");
const Product = require("../models/Product");
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
  const { addressId, shippingAmount, paymentMethod, voucher } = req.body;

  var Status = "pending";
  if (paymentMethod === "VNPAY") {
    Status = "confirmed";
  }
  const user = await User.findById(userId);
  let curCart = user.cart;

  if (curCart.length === 0) {
    return res.status(400).json({
      message: "cart is empty",
    });
  }

  try {
    let total = 0;
    let discount = 0;
    for (let i = 0; i < curCart.length; i++) {
      total += curCart[i].price * curCart[i].quantity;
      const productCart = await Product.findById(curCart[i].id);
      productCart.quantity -= curCart[i].quantity;
      await productCart.save();
    }
    total += shippingAmount;
    if (voucher && voucher.condition <= total - shippingAmount) {
      if (voucher.type === "ship") {
        discount = shippingAmount;
      }
      if (voucher.type === "percent") {
        discount = (voucher.discountPercent * total) / 100;
      }
      if (voucher.type === "amount") {
        discount = voucher.discountAmount;
      }
      if (discount > voucher.discountLimit) {
        discount = voucher.discountLimit;
      }
      const listVoucher = user.vouchers;
      listVoucher.forEach((v) => {
        if (v.voucher == voucher._id) {
          v.used = true;
        }
      });
      await User.findByIdAndUpdate(userId, {
        vouchers: listVoucher,
      });
    }

    total -= discount;

    const detail = curCart.map((cart) => ({
      product: cart.id,
      quantity: cart.quantity,
    }));

    const newOrder = new Order({
      user: userId,
      address: addressId,
      Status,
      detail,
      shippingAmount,
      voucher,
      discount,
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
    const mailOptions = {
      from: '"Tech Store "<techstore1121@gmail.com>',
      to: user.email,
      subject: "Order successfully",
      html: `
    <h1>Your order id: ${newOrder._id}</>
    <h2>Total order value: ${newOrder.total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}</h2>
    <h2>Please check your order <a href="http://localhost:3000/checkorder">here!</a></h2>`,
    };

    try {
      transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }

    const updateUser = await User.findById(userId).populate("vouchers.voucher");

    return res.status(200).json({
      success: true,
      message: "checkout success",
      data: { user: updateUser },
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
      .sort({ updatedAt: -1 });

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
    const curOrder = await Order.findById(orderId).populate("detail.product");
    const listProduct = curOrder.detail;

    for (let i = 0; i < listStatus.length; i++) {
      if (curOrder.Status == listStatus[i]) {
        status = listStatus[i + 1];
        if (status == "completed") {
          listProduct.forEach(async (item) => {
            await Product.findByIdAndUpdate(item.product._id, {
              score: item.product.score + 1,
              sellQuantity: item.product.sellQuantity
                ? item.product.sellQuantity + 1
                : 1,
            });
          });
        }
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
    const cancelOrder = await Order.findById(orderId).populate([
      "detail.product",
    ]);
    const listProduct = cancelOrder.detail;
    listProduct.forEach(async (pd) => {
      const product = pd.product;
      product.quantity += pd.quantity;
      await product.save();
    });

    const newListOrder = await Order.find({ user: userId })
      .populate(["detail.product", "user", "address"])
      .sort({
        updatedAt: -1,
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
      .sort({ updatedAt: -1 });

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
      .sort({ updatedAt: -1 });

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

exports.cancelOrderAdmin = async (req, res) => {
  const orderId = req.params.id;
  try {
    await Order.findByIdAndUpdate(orderId, {
      Status: "cancelled",
    });
    const newListOrder = await Order.find()
      .populate(["detail.product", "user", "address"])
      .sort({
        updatedAt: -1,
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
