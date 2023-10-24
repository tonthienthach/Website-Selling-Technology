const Voucher = require("../models/Voucher");

exports.getAllVoucher = async (req, res) => {
  try {
    const listVoucher = await Voucher.find().sort({
      status: -1,
    });
    res.status(200).json({
      success: true,
      data: listVoucher,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can not get list voucher",
    });
  }
};

exports.getVoucherAvailable = async (req, res) => {
  try {
    const listVoucher = await Voucher.find({ status: true });
    res.status(200).json({
      success: true,
      data: listVoucher,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can not get list voucher",
    });
  }
};

exports.createVoucher = async (req, res) => {
  const {
    name,
    code,
    type,
    discountAmount,
    discountPercent,
    expirationDate,
    quantity,
    discountLimit,
    condition,
    description,
  } = req.body;

  try {
    const newVoucher = new Voucher({
      name,
      code,
      type,
      discountAmount,
      discountPercent,
      expirationDate: new Date(expirationDate),
      quantity,
      discountLimit,
      condition,
      description,
    });

    await newVoucher.save();
    console.log(newVoucher);
    const listVoucher = await Voucher.find().sort({
      status: -1,
    });

    res.status(200).json({
      success: true,
      data: listVoucher,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "add voucher err",
    });
  }
};

exports.updateVoucherStatus = async (req, res) => {
  const voucherId = req.params.voucherId;
  const voucher = await Voucher.findById(voucherId);
  var status = !voucher.status;

  try {
    await Voucher.findByIdAndUpdate(voucherId, {
      status,
    });
    const listVoucher = await Voucher.find().sort({
      status: -1,
    });
    res.status(200).json({
      success: true,
      data: listVoucher,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "update status voucher err",
    });
  }
};
