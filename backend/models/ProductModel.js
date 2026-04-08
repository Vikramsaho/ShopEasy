const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },

    productDescription: {
        type: String,
        required: true,
    },
    
    productImage: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)