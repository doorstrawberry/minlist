// importing dependeicies
const express = require("express")
const Users = require("../models/users.js")

// creating router
const router = express.Router()

// routes
router.get("/:fromid/new/:forid", (req, res) => {
    Users.findById(req.params.fromid)
        .then((fromUser) => {
            Users.findById(req.params.forid)
                .then((toUser) => {
                    res.render("reviews/new", {
                        fromUser: fromUser,
                        toUser: toUser
                    })
                })
        })
})

router.post("/:fromid/new/:forid", (req, res) => {
    Users.findById(req.params.fromid)
        .then((fromUser) => {
            Users.findById(req.params.forid, function (err, user) {
                req.body.username = fromUser.name
                user.reviews.push(req.body)
                user.save(function (err) {
                    res.redirect(`/users/${req.params.fromid}/accountview/${req.params.forid}`)
                })
            })
        })
})



module.exports = router