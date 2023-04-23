const mongoose = require("mongoose");

const ColorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hexcode: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Color", ColorSchema);
