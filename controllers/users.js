// importing dependeicies
const express = require("express")
const Users = require("../models/users.js")

// creating router
const router = express.Router()

// routes

// login
router.get("/login", (req, res) => {
    res.render("users/login")
})

// sign up
router.get("/signup", (req, res) => {
    res.render("users/signup")
})

// export the router
module.exports = router