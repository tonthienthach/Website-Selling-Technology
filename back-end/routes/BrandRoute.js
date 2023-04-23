const express = require("express")
const { getAllBrand, createBrand } = require("../controllers/BrandController")

const router = express.Router()


//get all brand
router.get('/', getAllBrand)

router.post('/create', createBrand)

// router.delete('/delete',delBrand)

module.exports = router