// importing dependeicies
const express = require("express")
const Users = require("../models/users.js")
const bcrypt = require("bcrypt");

// creating router
const router = express.Router()

// routes

// show login
router.get("/login", (req, res) => {
    res.render("users/login")
})

// log in
router.post("/login", (req, res) => {
    // get the data from the request body
    const { username, password } = req.body;

    // searching for the user
    Users.findOne({username: username})
    .then(async (user) => {
        if (user) {
            const result = await bcrypt.compare(password, user.password)

            if (result) {
                // store properties in the session
                req.session.username = username
                req.session.loggedIn = true

                // redirect to users account
                res.render('users/account', {
                    userInfo: user
                })
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

// show sign up
router.get("/signup", (req, res) => {
    res.render("users/signup")
})

// make account
router.post("/signup", async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )

    // create user
    Users.create(req.body)
        .then((user) => {
            res.redirect("/users/login")
        })
        .catch((error) => {
            console.log(error)
            res.json({ error })
        })
})

router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.redirect("/");
    });
});

// export the router
module.exports = router