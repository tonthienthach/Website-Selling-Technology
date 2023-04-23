const mongoose = require("mongoose")

const RateSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    score: {
        type: Number,
    },
    content: {
        type: String,
    }
    
}, {timestamps: true })

module.exports = mongoose.model("Rate",RateSchema)



