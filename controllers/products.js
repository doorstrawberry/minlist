// importing dependeicies
const express = require("express")
const Products = require("../models/products.js")
const Users = require("../models/users.js")

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

router.get("/:userid/show/:ownerid/:index", (req, res) => {
    Users.findById(req.params.userid)
    .then((user1) => {
        Users.findById(req.params.ownerid)
        .then((user2) => {
            Products.find({})
            .then((products) => {
                res.render("products/show", {
                    viewingUser: user1,
                    productUser: user2,
                    product: products[req.params.index]
                })
            })
        })
    })
})

router.get("/:id/browse", (req, res) => {
    res.render("products/browse", {
        userID: req.params.id,
        allProducts: Products.find({})
    })
})

module.exports = router