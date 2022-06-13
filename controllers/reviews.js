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
            Users.findById(req.params.forid, function (err, forUser) {
                req.body.username = fromUser.name
                forUser.reviews.push(req.body)
                forUser.save(function (err) {
                    res.redirect(`/users/${req.params.forid}/accountview/${req.params.fromid}`)
                })
            })
        })
})



module.exports = router