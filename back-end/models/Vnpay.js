const mongoose = require("mongoose");
const VnpaySchema = mongoose.Schema(
  {
    vnp_TxnRef: {
      type: String,
      required: true,
      trim: true,
    },
    vnp_OrderInfo: {
      type: String,
      trim: true,
      required: true,
    },
    vnp_TransactionNo: {
      type: String,
    },
    vnp_Amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vnpay", VnpaySchema);
