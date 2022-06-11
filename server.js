// importing dependencies
require("dotenv").config() // need this to access the PORT variable in the .env file
const express = require("express") // need this to use express
const methodOverride = require("method-override") // need this to be able to make update and delete routes
const path = require("path") // need this in order to make referring to files easier
const mongoose = require("./models/connections.js") // need this to establish connection with our database and to use mongoose

// creating our application object
const app = require("liquid-express-views")(express(), { root: [path.resolve(__dirname, 'views/')] }) // also using liquid epxress views

// middleware
app.use(methodOverride("_method")) // to use the method-override dependency
app.use(express.urlencoded({extended: true})) // to be able to log data sent throughout the website
app.use(express.static("public")) // to place styling in the public directory


// routes
// testing route (will soon later become a log in)
app.get("/", (req, res) => {
    res.send("Checking route")
})

// server listener
const PORT = process.env.PORT // accessing the port from the env file
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`)) // provides feedback on which port the application is using