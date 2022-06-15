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

router.post("/:toid/new/:fromid", (req, res) => {
    Users.findById(req.params.toid)
        .then((fromUser) => {
            Users.findById(req.params.fromid, function (err, forUser) {
                req.body.username = fromUser.name
                req.body.writtenBy = req.params.fromid
                req.body.reviewFor = req.params.toid
                forUser.reviews.push(req.body)
                forUser.save(function (err) {
                    res.redirect(`/users/${req.params.fromid}/accountview/${req.params.toid}`)
                })
            })
        })
})



module.exports = router