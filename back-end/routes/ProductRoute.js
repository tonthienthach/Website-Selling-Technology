const express = require("express");
const {
  getAllProduct,
  getProductByID,
  searchProductByName,
  getProductByBrand,
  getProductByCate,
} = require("../controllers/ProductController");

const router = express.Router();

router.get("/", getAllProduct);

router.get("/:id", getProductByID);

router.post("/search", searchProductByName);

router.get("/brand/:brandId", getProductByBrand);

router.get("/cate/:cateId", getProductByCate);

module.exports = router;
