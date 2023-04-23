const mongoose = require("mongoose");

const TypeSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    type: {
        type: Array,
        trim : true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Type", TypeSchema);
