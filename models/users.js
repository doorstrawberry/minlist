// importing dependencies 
const mongoose = require("./connections.js")

// pull schema and model from mongoose
const { Schema, model } = mongoose

// make review schema
const reviewSchema = new Schema({
    // content of the review
    content: String,
    // rating of the user
    rating: {
        type: Number, 
        min: 1, 
        max: 5, 
        default: 5}
  }, {
    timestamps: true
  });

// make user schema
const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: String,
    contactinfo: String,
    // referencing the products list
    productsList: [{type: Schema.Types.ObjectId, ref: 'Products'}],
    // embedding the reviews list
    reviews: [reviewSchema]
}, {
    timestamps: true
})

// exporting user schema
const Users = model('User', usersSchema);
module.exports = Users