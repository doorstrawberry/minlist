// importing dependeicies
const express = require("express")
const Products = require("../models/products.js")
const Users = require("../models/users.js")

// creating router
const router = express.Router()

router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login");
    }
});

// routes
router.get("/:id/add", (req, res) => {
    res.render("products0/add.liquid", {
        userId: req.params.id
    })
})

router.post("/:id/add", (req, res) => {
    Products.create({
        belongsTo: req.params.id,
        name: req.body.name,
        img: req.body.img,
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
                res.render("products0/show.liquid", {
                    viewingUser: user1,
                    productUser: user2,
                    product: products[req.params.index]
                })
            })
        })
    })
})

router.get("/:id/browse", (req, res) => {
    res.render("products0/browse.liquid", {
        userID: req.params.id,
        allProducts: Products.find({})
    })
})

router.get("/:id/edit", (req,res) => {
    Products.findById(req.params.id)
    .then((product) => {
        res.render("products0/edit.liquid", {
            product: product
        })
    })
})

router.put("/:id/edit/:userid", (req, res) => {
    Products.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name, 
            description: req.body.description,
            img: req.body.img,
            price: req.body.price, 
            condition: req.body.condition}})
    .then((product) => {
        res.redirect(`/users/${req.params.userid}/account`)
    })
})

router.delete("/:id/delete/:userid", (req, res) => {
    Products.findByIdAndRemove(req.params.id)
    .then((next) => {
        res.redirect(`/users/${req.params.userid}/account`)
    })
})

module.exports = router