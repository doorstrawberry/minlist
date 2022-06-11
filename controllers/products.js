// importing dependencies
const express = require("express")
const Products = require("../models/products.js")

// creating router
const router = express.Router()

// routes

// index
router.get("/", (req, res) => {
    res.send("products index route")
})
// new
router.get("/new", (req, res) => {
    res.send("products new route")
})

// destroy

// update

// create

// edit
router.get("/:id/edit", (req, res) => {
    res.send("products edit route")
})

// show
router.get("/:id", (req, res) => {
    res.send("products show route")
})

// export the router
module.exports = router