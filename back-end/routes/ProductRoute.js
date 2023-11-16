const express = require("express");
const {
  getAllProduct,
  getProductByID,
  searchProductByName,
  getProductByBrand,
  getProductByCate,
  getTop12ProductRecommend,
  recommendForUser,
} = require("../controllers/ProductController");
const { verifyToken } = require("../middleware/VerifyToken");

const router = express.Router();

router.get("/", getAllProduct);

router.get("/:id", getProductByID);

router.post("/search", searchProductByName);

router.get("/brand/:brandId", getProductByBrand);

router.get("/cate/:cateId", getProductByCate);

router.get("/recommend/highscore", getTop12ProductRecommend);

router.get("/recommend/user", verifyToken, recommendForUser);

module.exports = router;
