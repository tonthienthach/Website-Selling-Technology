const Product = require("../models/Product");
const session = require("express-session");
const User = require("../models/User");

exports.addToCart = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const quantity = req.body.quantity || 1;

  try {
    const pd = await Product.findById(id);
    const user = await User.findById(userId);

    var newCart = user.cart;

    if (newCart.length === 0) {
      newCart.push({
        id: pd._id,
        name: pd.name,
        price: pd.price,
        image: pd.image[0].url,
        quantity: quantity,
      });
      await User.findByIdAndUpdate(userId, {
        cart: newCart,
      });
    } else {
      let newItem = true;
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].id == id) {
          newCart[i].quantity += 1;
          newItem = false;
          await User.findByIdAndUpdate(userId, {
            cart: newCart,
          });
          break;
        }
      }
      if (newItem) {
        newCart.push({
          id: pd._id,
          name: pd.name,
          price: pd.price,
          image: pd.image[0].url,
          quantity: quantity,
        });
        await User.findByIdAndUpdate(userId, {
          cart: newCart,
        });
      }
    }
    res.status(200).json({
      success: true,
      data: newCart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "add to cart fail",
      data: error,
    });
  }
};

exports.updateCart = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  const { quantity } = req.body;

  console.log(quantity);
  try {
    const user = await User.findById(userId);

    var updateCart = user.cart;
    for (let i = 0; i < updateCart.length; i++) {
      if (updateCart[i].id == id) {
        updateCart[i].quantity = quantity;
        break;
      }
    }
    await User.findByIdAndUpdate(userId, {
      cart: updateCart,
    });
    res.status(200).json({
      success: true,
      message: "Update cart successfully",
      data: updateCart,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: "Update cart failed",
      error,
    });
  }
};

exports.delCartItem = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  const user = await User.findById(userId);
  try {
    var delCart = user.cart;
    if (delCart.length === 0) {
      res.status(404).json({
        success: false,
        message: "cart is empty",
      });
    }
    for (let i = 0; i < delCart.length; i++) {
      if (delCart[i].id == id) {
        delCart.splice(i, 1);
        break;
      }
    }
    await User.findByIdAndUpdate(userId, {
      cart: delCart,
    });
    let totalQuantity = 0;
    let totalAmount = 0;
    for (let i = 0; i < delCart.length; i++) {
      totalQuantity += delCart[i].quantity;
      totalAmount += delCart[i].quantity * delCart[i].price;
    }
    res.status(200).json({
      success: true,
      message: "delelte item successfully",
      totalAmount,
      totalQuantity,
      data: delCart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "delelte item failed",
    });
  }
};

exports.getItemInCart = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  var curCart = user.cart;
  if (curCart.length === 0) {
    return res.status(400).json({
      success: false,
      message: "cart is empty",
    });
  }
  try {
    let totalQuantity = 0;
    let totalAmount = 0;
    for (let i = 0; i < curCart.length; i++) {
      totalQuantity += curCart[i].quantity;
      totalAmount += curCart[i].quantity * curCart[i].price;
    }
    res.status(200).json({
      success: true,
      totalAmount,
      totalQuantity,
      data: curCart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error",
    });
  }
};

exports.increaseCart = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    var updateCart = user.cart;
    for (let i = 0; i < updateCart.length; i++) {
      if (updateCart[i].id == id) {
        updateCart[i].quantity += 1;
        break;
      }
    }
    await User.findByIdAndUpdate(userId, {
      cart: updateCart,
    });
    let totalQuantity = 0;
    let totalAmount = 0;
    for (let i = 0; i < updateCart.length; i++) {
      totalQuantity += updateCart[i].quantity;
      totalAmount += updateCart[i].quantity * updateCart[i].price;
    }
    res.status(200).json({
      success: true,
      message: "increase cart successfully",
      totalAmount,
      totalQuantity,
      data: updateCart,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: "increase cart failed",
      error,
    });
  }
};

exports.decreaseCart = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    var updateCart = user.cart;
    for (let i = 0; i < updateCart.length; i++) {
      if (updateCart[i].id == id) {
        updateCart[i].quantity -= 1;
        break;
      }
    }
    await User.findByIdAndUpdate(userId, {
      cart: updateCart,
    });
    let totalQuantity = 0;
    let totalAmount = 0;
    for (let i = 0; i < updateCart.length; i++) {
      totalQuantity += updateCart[i].quantity;
      totalAmount += updateCart[i].quantity * updateCart[i].price;
    }
    res.status(200).json({
      success: true,
      message: "decrease cart successfully",
      totalAmount,
      totalQuantity,
      data: updateCart,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: "decrease cart failed",
      error,
    });
  }
};
