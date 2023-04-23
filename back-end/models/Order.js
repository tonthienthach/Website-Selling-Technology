const mongoose = require("mongoose");

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
      enum: ["Pending", "Confirmed", "Shipping", "Completed", "Cancelled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
