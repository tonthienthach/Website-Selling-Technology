const express = require("express");
const {
  getAllProduct,
  getProductByID,
  searchProductByName,
  getProductByBrand,
  getProductByCate,
  getTop12ProductRecommend,
} = require("../controllers/ProductController");

const router = express.Router();

router.get("/", getAllProduct);

router.get("/:id", getProductByID);

router.post("/search", searchProductByName);

router.get("/brand/:brandId", getProductByBrand);

router.get("/cate/:cateId", getProductByCate);

router.get("/recommend/highscore", getTop12ProductRecommend);

module.exports = router;
