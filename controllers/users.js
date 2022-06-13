// importing dependeicies
const express = require("express")
const Users = require("../models/users.js")

// creating router
const router = express.Router()

// routes

// index -> sign up
router.get("/signup", (req, res) => {
    res.render("users/signup")
})

// sign up -> log in
router.post("/signup", (req, res) => {
    res.render("users/login")
})

// index -> log in 
router.get("/login", (req, res) => {
    res.render("users/login")
})

// log in -> account
router.post("/login", (req, res) => {
    res.render("users/account")
})

// log out -> index
router.get("/logout", (req, res) => {
    res.render("index")
})

// account button -> account page
router.get("/account", (req, res) => {
    res.render("users/account")
})

// edit account button -> edit account page
router.get("/users/account/edit", (req, res) => {
    res.render("users/account-edit")
})

// export the router
module.exports = router