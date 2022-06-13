// importing dependeicies
const express = require("express")
const Users = require("../models/users.js")

// creating router
const router = express.Router()

// routes
router.get("/", (req, res) => {
    res.send("reviews")
})

module.exports = router