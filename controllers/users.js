// importing dependeicies
const express = require("express")
const Users = require("../models/users.js")
const bcrypt = require("bcrypt")

// creating router
const router = express.Router()

// routes

// index -> sign up
router.get("/signup", (req, res) => {
    res.render("users/signup")
})

// sign up -> log in
router.post("/signup", async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    // create user
    Users.create(req.body)
        .then((user) => {
            res.render("users/login")
        })
        .catch((error) => {
            console.log(error)
            res.json({ error })
        })
})

// index -> log in 
router.get("/login", (req, res) => {
    res.render("users/login")
})

// log in -> account
router.post("/login", (req, res) => {
    // get the data from the request body
    const { username, password } = req.body;

    // search for the user
    Users.findOne({ username: username })
        .then(async (user) => {
            // checking if the user exists
            if (user) {
                // compare password
                const result = await bcrypt.compare(password, user.password)
                if (result) {
                    // store properties in the session
                    req.session.username = username
                    req.session.loggedIn = true

                    // redirect to users account page
                    res.render("users/account")
                }
                else {
                    res.json({ error: "password doesen't match" })
                }
            }
            else {
                res.json({ error: "user doesen't exist" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.json({ error })
        })
})

// log out button -> index
router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.render("index")
    });
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