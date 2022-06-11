// importing dependeicies
const express = require("express")
const Users = require("../models/users.js")

// creating router
const router = express.Router()

// routes

// index
router.get("/", (req, res) => {
    res.send("reviews index route")
})
// new
router.get("/new", (req, res) => {
    res.send("reviews new route")
})

// destroy

// update

// create

// edit
router.get("/:id/edit", (req, res) => {
    res.send("reviews edit route")
})

// show
router.get("/:id", (req, res) => {
    res.send("reviews show route")
})

// export the router
module.exports = router