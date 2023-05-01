const Category = require("../models/Category");

exports.getAllCate = async (req, res) => {
  const allCate = await Category.find();
  res.json({
    allCate,
  });
};

exports.createCate = async (req, res) => {
  try {
    const { name } = req.body;
    const newCate = new Category({
      name,
    });
    await newCate.save();
    res.status(200).json({
      success: true,
      message: "create cate success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "create cate failed",
    });
  }
};

exports.getCateById = async (req, res) => {
  const cateId = req.params.id;
  try {
    const cate = await Category.findById(cateId);
    res.status(200).json({
      success: true,
      data: cate,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "get cate failed",
    });
  }
};
