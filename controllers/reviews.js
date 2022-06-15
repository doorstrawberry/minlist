// importing dependeicies
const express = require("express")
const { isObjectIdOrHexString, Cursor } = require("mongoose")
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

router.put("/:toid/delete/:fromid/:reviewid", (req, res) => {
    Users.findById(req.params.fromid)
        .populate("reviews").exec(function (err) {
            Users.findById(req.params.fromid)
                .then((user) => {
                    for (let i = 0; i < user.reviews.length; i++) {
                        if (user.reviews[i] === user.reviews.id(req.params.reviewid)) {                         
                            Users.find({_id: req.params.fromid})
                            .then((user) => {
                                console.log(user)
                            })
                        }
                    }
                })
        })
    res.redirect(`/users/${req.params.fromid}/accountview/${req.params.toid}`)
})

module.exports = router