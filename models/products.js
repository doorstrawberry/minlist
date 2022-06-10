// import dependencies
const mongoose = require("./connections.js")

// pull schema and model from mongoose
const { Schema, model } = mongoose

// making product schema
const productSchema = new Schema({
    name: String,
    img: { 
        data: Buffer, 
        contentType: String 
    },
    description: String,
    datePosted: Date
}, {
    timestamps: true
  })

// making product model
const MinlistProduct = model("MinlistProduct", productSchema)

// exporting minlist product
module.exports = MinlistProduct