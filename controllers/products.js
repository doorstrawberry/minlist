// importing dependeicies
const express = require("express")
const Products = require("../models/products.js")

// creating router
const router = express.Router()

// routes
router.get("/:id/add", (req, res) => {
    res.render("products/add", {
        userId: req.params.id
    })
})

router.post("/:id/add", (req, res) => {
    Products.create({
        belongsTo: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        condition: req.body.condition
    })
    .then((product) => {
        res.redirect(`/users/${req.params.id}/account`)
    })
})

router.get("/:id/browse", (req, res) => {
    res.render("products/browse", {
        allProducts: Products.find({})
    })
})

module.exports = router