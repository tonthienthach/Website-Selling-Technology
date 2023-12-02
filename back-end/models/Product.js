const mongoose = require("mongoose");
const moment = require("moment-timezone");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    quantity: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
    },
    image: {
      type: Array,
      required: true,
    },
    sellQuantity: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    CPU: {
      type: String,
    },
    ram: {
      type: String,
    },
    rom: {
      type: String,
    },
    VGA: {
      type: String,
    },
    display: {
      type: String,
    },
    battery: {
      type: String,
    },
    OS: {
      type: String,
    },
    weight: {
      type: String,
    },
    camera1: {
      type: String,
    },
    camera2: {
      type: String,
    },
    description: {
      type: String,
    },
    other: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
