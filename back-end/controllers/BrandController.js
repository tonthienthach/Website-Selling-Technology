const Brand = require("../models/Brand");

exports.getAllBrand = async (req, res) => {
  const allBrand = await Brand.find();
  res.json({
    allBrand,
  });
};

exports.createBrand = async (req, res) => {
  const { name, cateId } = req.body;
  try {
    const newBrand = new Brand({
      name,
      cate: cateId,
    });
    await newBrand.save();
    res.status(200).json({
      success: true,
      message: "create brand success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "create brand failed",
    });
  }
};

exports.getBrandByCate = async (req, res, nex) => {
  const cateId = req.params.id;
  try {
    const listbrand = await Brand.find({ cate: cateId });
    res.status(200).json({
      success: true,
      data: listbrand,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "get brand failed",
    });
  }
};
