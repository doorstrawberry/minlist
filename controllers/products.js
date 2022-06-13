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
    Products.create(req.body)
    .then((product) => {
        res.redirect(`/users/${req.params.id}/account`)
    })
})

module.exports = router