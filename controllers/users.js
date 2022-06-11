// importing dependeicies
const express = require("express")
const Users = require("../models/users.js")

// creating router
const router = express.Router()

// routes

// index
router.get("/", (req, res) => {
    res.send("users index route")
})
// new
router.get("/new", (req, res) => {
    res.send("users new route")
})

// destroy

// update

// create

// edit
router.get("/:id/edit", (req, res) => {
    res.send("users edit route")
})

// show
router.get("/:id", (req, res) => {
    res.send("users show route")
})

// export the router
module.exports = router