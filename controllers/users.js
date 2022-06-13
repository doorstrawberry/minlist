// importing dependeicies
const express = require("express")
const Users = require("../models/users.js")
const Products = require("../models/products.js")
const bcrypt = require("bcrypt")

// Used to remove document by ID
const { MongoClient, ObjectId } = require('mongodb');

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
                    res.redirect(`/users/${user._id}/account`)
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
router.get("/:id/account", (req, res) => {
    Users.find({ belongsTo: req.params.id })
        .populate('productsList').exec(function (err) {
            Users.findOne({ _id: req.params.id }).then((userp) => {
                Products.find({belongsTo: req.params.id })
                    .then((products) => {
                        res.render(`users/account`, {
                            user_id: req.params.id,
                            user: userp,
                            productsList: products,
                            reviewsList: userp.reviews
                        })
                    })
            })
        })
})

router.get("/:id/accountview/:viewingId", (req, res) => {
    Users.findById(req.params.id)
    .then((viewingUser) => {
        Users.findById(req.params.viewingId)
        .then((viewedUser) => {
            res.render("users/account-view", {
                viewedUser: viewedUser,
                viewingUser: viewingUser,
                reviews: viewedUser.reviews
            })
        })
    })
})

// edit account button -> edit account page
router.get("/:id/edit", (req, res) => {
    Users.findById(req.params.id)
        .then((user) => {
            res.render("users/account-edit", {
                user: user
            })
        })
})

router.delete("/:id/delete", (req, res) => {
    Users.deleteOne({ "_id": ObjectId(req.params.id) })
        .then((user) => {
            res.redirect("/")
        })
})

router.put("/:id/update", (req, res) => {
    Users.updateOne({ _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                contactinfo: req.body.contactinfo,
                username: req.body.username,
                location: req.body.location,
            }
        })
        .then((user) => {
            // redirect to main page after updating
            res.redirect("account");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
})

// export the router
module.exports = router