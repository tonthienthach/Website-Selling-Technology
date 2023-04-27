const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    districtId: {
      type: Number,
    },
    ward: {
      type: String,
      required: true,
    },
    wardCode: {
      type: String,
    },
    detail: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
