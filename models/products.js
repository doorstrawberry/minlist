// importing dependencies 
const mongoose = require("./connections.js")

// pull schema and model from mongoose
const { Schema, model } = mongoose

// make product schema 
const productsSchema = new Schema({
    // name of the product 
    name: {
        type: String,
        required: true
    }, 
    // image of the product
    img: {
        type: String
    },
    // description of the product
    description: String,
    // product price
    price: {
        type: Number,
        minimum: 0, 
        description: "Has to be a valid price"
    }, 
    // product's condition
    condition: String,
    // date the product was posted
    datePosted: {
        type: Date,
        default: Date()
    },
    belongsTo: {
        type: String
    }
}, {
    timestamps: true
}, {
    strict: false
})

// makes product model
const Products = model('Products', productsSchema)
module.exports = Products