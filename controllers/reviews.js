// importing dependeicies
const express = require("express")
const { isObjectIdOrHexString, Cursor } = require("mongoose")
const Users = require("../models/users.js")

// creating router
const router = express.Router()

router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login");
    }
});

// routes
router.get("/:fromid/new/:forid", (req, res) => {
    Users.findById(req.params.fromid)
        .then((fromUser) => {
            Users.findById(req.params.forid)
                .then((toUser) => {
                    res.render("reviews/new.liquid", {
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

router.delete("/:toid/delete/:fromid/:reviewid", (req, res) => {
    const fromId = req.params.fromid
    const reviewId = req.params.reviewid
    Users.findById(fromId)
    .then((user) => {
        const theReviews = user.reviews.id(reviewId)
        if (String(theReviews._id) === req.params.reviewid) {
            theReviews.remove()
            return user.save()
        }
        else {
            return
        }
    })
    .then((user) => {
        res.redirect(`/users/${req.params.fromid}/accountview/${req.params.toid}`)
    })
})

router.get("/:toid/update/:fromid/:reviewid", (req, res) => {
    const fromId = req.params.fromid
    const reviewId = req.params.reviewid
    Users.findById(fromId)
    .then((user) => {
        const theReviews = user.reviews.id(reviewId)
        if (String(theReviews._id) === req.params.reviewid){
            res.render("reviews/edit.liquid", {
                reviewid: req.params.reviewid,
                toUserId: req.params.toid,
                fromUser: user,
                review: theReviews
            })
        }
        else {
            return
        }
    })
})

router.put("/:toid/update/:fromid/:reviewid", (req, res) => {
    const fromId = req.params.fromid
    const reviewId = req.params.reviewid
    Users.findById(fromId)
    .then((user) => {
        const theReviews = user.reviews.id(reviewId)
        if (String(theReviews._id) === req.params.reviewid){
            theReviews.content = req.body.content
            return user.save()
        }
        else {
            return
        }
    })
    .then((user) => {
        res.redirect(`/users/${req.params.fromid}/accountview/${req.params.toid}`)
    })
})

module.exports = router