const mongoose = require("mongoose");
const VoucherSchema = mongoose.Schema(
  {
    code: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["percent", "amount", "ship"],
      default: "amount",
    },
    discountAmount: {
      type: Number,
    },
    discountPercent: {
      type: Number,
      min: 0,
      max: 100,
    },
    expirationDate: {
      type: Date,
    },
    quantity: {
      type: Number,
      required: true,
    },
    discountLimit: {
      type: Number,
    },
    condition: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

VoucherSchema.statics.updateVoucherStatus = async function () {
  const now = new Date();
  await this.updateMany(
    { expirationDate: { $lte: now }, status: true },
    { status: false }
  );
};

const Voucher = mongoose.model("Voucher", VoucherSchema);

setInterval(async () => {
  await Voucher.updateVoucherStatus();
}, 24 * 60 * 60 * 1000);

module.exports = Voucher;
