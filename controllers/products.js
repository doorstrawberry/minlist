// importing dependencies
const express = require("express")
const Products = require("../models/products.js")

// creating router
const router = express.Router()

// routes
router.get("/", (req, res) => {
    res.render("products/browse-products")
})

router.get("/sellers", (req, res) => {
    res.render("products/browse-sellers")
})

router.get("/create", (req, res) => {
    res.render("products/add-product")
})

// export the router
module.exports = router