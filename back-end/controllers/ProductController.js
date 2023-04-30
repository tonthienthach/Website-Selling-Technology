const Product = require("../models/Product");

exports.getAllProduct = async (req, res) => {
  const allProduct = await Product.find();
  res.status(200).json({
    product: allProduct,
  });
};

exports.createProduct = async (req, res) => {
  const {
    name,
    cate,
    brand,
    quantity,
    price,
    image,
    CPU,
    ram,
    rom,
    VGA,
    display,
    battery,
    OS,
    weight,
    description,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      cate,
      brand,
      quantity,
      price,
      image,
      CPU,
      ram,
      rom,
      VGA,
      display,
      battery,
      OS,
      weight,
      description,
    });

    await newProduct.save();
    const newListProduct = await Product.find();
    res.status(200).json({
      success: true,
      message: "Create Product Success",
      data: newListProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Create Product Failed",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const {
    name,
    cate,
    brand,
    quantity,
    price,
    image,
    status,
    CPU,
    ram,
    rom,
    VGA,
    display,
    battery,
    OS,
    weight,
    description,
  } = req.body;
  const id = req.params.id;

  try {
    await Product.findByIdAndUpdate(id, {
      name,
      cate,
      brand,
      quantity,
      price,
      image,
      status,
      CPU,
      ram,
      rom,
      VGA,
      display,
      battery,
      OS,
      weight,
      description,
    });
    res.status(200).json({
      success: true,
      message: "update product success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "update product failed",
    });
  }
};

exports.delProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndRemove(id);
    res.status(200).json({
      success: true,
      message: "del product success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "update product failed",
    });
  }
};

exports.getProductByID = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({
      success: true,
      message: "get product success",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "product not found",
    });
  }
};

exports.searchProductByName = async (req, res) => {
  const { keyWord } = req.body;
  try {
    const searchResult = await Product.find({ name: { $regex: keyWord } });
    console.log(searchResult);
    if (searchResult.length == 0) {
      return res.status(404).json({
        success: false,
        message: `cannot find product with keyword ${keyWord}`,
      });
    }
    res.status(200).json({
      success: true,
      data: searchResult,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "not found",
    });
  }
};

exports.getProductByBrand = async (req, res) => {
  const brandId = req.params.brandId;
  try {
    const listProduct = await Product.find({ brand: brandId });

    res.status(200).json({
      success: true,
      data: listProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "get product by brand error",
    });
  }
};

exports.getProductByCate = async (req, res) => {
  const cateId = req.params.cateId;
  try {
    const listProduct = await Product.find({ cate: cateId });

    res.status(200).json({
      success: true,
      data: listProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "get product by brand error",
    });
  }
};
