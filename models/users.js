// importing dependencies 
const mongoose = require("./connections.js")

// pull schema and model from mongoose
const { Schema, model } = mongoose

// make review schema
const reviewSchema = new Schema({
    // name of reviewer
    username: String,
    // content of the review
    content: String,
    // who is this review for?
    reviewFor: String,
    // who is this review written by?
    writtenBy: String
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