// importing dependeicies
const express = require("express")
const Products = require("../models/products.js")
const Users = require("../models/users.js")

// creating router
const router = express.Router()

// routes
router.get("/:id/add", (req, res) => {
    res.render("products/add")
})

module.exports = router