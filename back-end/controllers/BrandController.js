const Brand = require("../models/Brand")


exports.getAllBrand = async(req, res) =>{
    const allBrand = await Brand.find();
    res.json({
        allBrand
    })
}

exports.createBrand = async (req, res) => {
    
    const {name} = req.body
    try {

        const newBrand = new Brand({
            name
        })
        await newBrand.save()
        res.status(200).json({
            success: true,
            message: "create brand success"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "create brand failed"
        })
    }
}