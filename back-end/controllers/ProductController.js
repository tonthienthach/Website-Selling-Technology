const Category = require("../models/Category");
const Product = require("../models/Product");
const axios = require("axios");

exports.getAllProduct = async (req, res) => {
  const allProduct = await Product.find({ status: true }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    data: allProduct,
  });
};

exports.createProduct = async (req, res) => {
  const {
    name,
    cate,
    brand,
    quantity,
    price,
    salePrice,
    image,
    CPU,
    ram,
    rom,
    VGA,
    display,
    battery,
    OS,
    weight,
    camera1,
    camera2,
    description,
    other,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      cate,
      brand,
      quantity,
      price,
      salePrice,
      image,
      CPU,
      ram,
      rom,
      VGA,
      display,
      battery,
      OS,
      weight,
      camera1,
      camera2,
      description,
      other,
    });

    await newProduct.save();
    const newListProduct = await Product.find({ status: true });
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
    salePrice,
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
    camera1,
    camera2,
    description,
    other,
  } = req.body;
  const id = req.params.id;

  try {
    await Product.findByIdAndUpdate(id, {
      name,
      cate,
      brand,
      quantity,
      price,
      salePrice,
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
      camera1,
      camera2,
      description,
      other,
    });
    const newListProduct = await Product.find({ status: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      message: "update product success",
      data: newListProduct,
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
    await Product.findByIdAndUpdate(id, { status: false });
    const newListProduct = await Product.find({ status: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      message: "del product success",
      data: newListProduct,
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
  const searchTerms = keyWord.split(" ");
  const searchRegex = searchTerms.map((term) => new RegExp(term, "i"));
  try {
    const searchResult = await Product.find({
      $or: [
        { name: { $in: searchRegex } },
        { description: { $in: searchRegex } },
        // Thêm các trường khác nếu cần thiết
      ],
    });
    const cateResult = await Category.find({ name: { $in: searchRegex } });
    const searchResultBycate = [];
    for (let i = 0; i < cateResult.length; i++) {
      let listProduct = await Product.find({
        cate: cateResult[i]._id,
      });
      searchResultBycate.push(...listProduct);
    }
    if (searchResult.length > 0) {
      searchResultBycate.forEach((item) => {
        let available = true;
        searchResult.forEach((pd) => {
          if (item.name === pd.name) {
            available = false;
          }
        });

        if (available) {
          searchResult.push(item);
        }
      });
    } else {
      searchResult.push(...searchResultBycate);
    }

    if (searchResult.length == 0) {
      return res.status(200).json({
        success: false,
        message: `cannot find product with keyword ${keyWord}`,
      });
    }
    console.log(searchResult);
    res.status(200).json({
      success: true,
      data: searchResult,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "erorr",
    });
  }
};

exports.getProductByBrand = async (req, res) => {
  const brandId = req.params.brandId;
  try {
    const listProduct = await Product.find({
      brand: brandId,
      status: true,
    }).sort({ createdAt: -1 });

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
    const listProduct = await Product.find({ cate: cateId, status: true }).sort(
      { createdAt: -1 }
    );

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

exports.getTop12ProductRecommend = async (req, res) => {
  const allProduct = await Product.find({ status: true, score: { $gt: 0 } })
    .sort({
      score: -1,
    })
    .limit(12);
  res.status(200).json({
    success: true,
    data: allProduct,
  });
};

exports.recommendForUser = async (req, res) => {
  const userId = req.userId;

  try {
    const data = await axios.get(`http://127.0.0.1:8000/recommend/${userId}`);
    result = data.data.recommendations;
    const recommend = await Promise.all(
      result.map(async (item) => {
        const product = await Product.findById(item);
        if (product && product.status) {
          return product;
        }
      })
    );
    const filterRecommend = recommend.filter(
      (item) => item !== undefined && item.status != false && item.quantity > 0
    );
    res.status(200).json({
      success: true,
      data: filterRecommend.slice(0, 8),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "get recommend err",
    });
  }
};
