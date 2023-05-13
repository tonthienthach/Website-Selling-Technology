const mongoose = require("mongoose");
const moment = require("moment-timezone");
const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    Status: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "completed", "cancelled"],
      default: "pending",
    },
    detail: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    shippingAmount: {
      type: Number,
    },
    total: {
      type: Number,
    },
    paymentMethod: {
      type: String,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
