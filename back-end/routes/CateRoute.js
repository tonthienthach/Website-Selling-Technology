const express = require("express")
const { getAllCate, createCate } = require("../controllers/CateController")

const router = express.Router()


//get all brand
router.get('/', getAllCate)

router.post('/create', createCate)

// router.delete('/delete',delBrand)

module.exports = router