const Order = require("../models/Order");

const OrderDetail = require("../models/OrderDetail");
const User = require("../models/User");

exports.checkout = async (req, res, next) => {
  const userId = req.userId;
  const { addressId } = req.body;
  const status = "Pending";
  const user = await User.findById(userId);
  let curCart = user.cart;

  if (curCart.length === 0) {
    return res.status(400).json({
      message: "cart is empty",
    });
  }

  try {
    const newOrder = new Order({
      user: userId,
      address: addressId,
      status,
    });

    await newOrder.save();
    console.log(newOrder);
    for (let i = 0; i < curCart.length; i++) {
      await OrderDetail.create({
        order: newOrder._id,
        product: curCart[i].id,
        quantity: curCart[i].quantity,
        color: curCart[i].color,
      });
    }
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
