const Address = require("../models/Address");

exports.addAddress = async (req, res, next) => {
  const { city, district, ward, detail, phone, districtId, wardCode } =
    req.body;
  const userId = req.userId;

  try {
    const newAddress = new Address({
      user: userId,
      city,
      district,
      districtId,
      ward,
      wardCode,
      detail,
      phone,
    });

    await newAddress.save();
    console.log(newAddress);
    const newListAddress = await Address.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "add address success",
      data: newListAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "add address failed",
    });
  }
};

exports.getUserAddress = async (req, res) => {
  const userId = req.userId;
  try {
    const listAdress = await Address.find({ user: userId }).sort({
      createdAt: -1,
    });
    // console.log(listAdress);
    res.status(200).json({
      success: true,
      data: listAdress,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "token not found",
    });
  }
};

exports.delUserAddress = async (req, res) => {
  const addressId = req.params.addressId;
  const userId = req.userId;

  try {
    await Address.findByIdAndDelete(addressId);
    const listAdress = await Address.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      data: listAdress,
      message: "Successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      data: "delete failed",
    });
  }
};
