const express = require("express");
const {
  getAllCate,
  createCate,
  getCateById,
} = require("../controllers/CateController");

const router = express.Router();

//get all brand
router.get("/", getAllCate);
router.get("/:id", getCateById);
router.post("/create", createCate);

// router.delete('/delete',delBrand)

module.exports = router;
