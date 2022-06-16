// importing dependencies
require("dotenv").config() // need this to access the PORT variable in the .env file
const express = require("express") // need this to use express
const methodOverride = require("method-override") // need this to be able to make update and delete routes
const path = require("path") // need this in order to make referring to files easier
const mongoose = require("./models/connections.js") // need this to establish connection with our database and to use mongoose

// creating our application object
const app = require("liquid-express-views")(express(), { root: [path.resolve(__dirname, 'views/')] }) // also using liquid epxress views

// to use the products route
const ProductsRouter = require("./controllers/products.js")

// to use the users route
const UsersRouter = require("./controllers/users.js")

// to use the reviews route
const ReviewsRouter = require("./controllers/reviews.js")

// to allow log in
const session = require("express-session")
const MongoStore = require("connect-mongo")

// middleware
app.use(methodOverride("_method")) // to use the method-override dependency
app.use(express.urlencoded({extended: true})) // to be able to log data sent throughout the website
app.use(express.static("public")) // to place styling in the public directory
// to set up my session
app.use(
    session({
        secret: process.env.SECRET,
        store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
        saveUninitialized: true,
        resave: false
    })
);

// routes
app.use("/products", ProductsRouter)
app.use("/users", UsersRouter)
app.use("/reviews", ReviewsRouter)
// testing route (will soon later become a log in)
app.get("/", (req, res) => {
    res.render("start/index.liquid")
})

// server listener
const PORT = process.env.PORT // accessing the port from the env file
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`)) // provides feedback on which port the application is using