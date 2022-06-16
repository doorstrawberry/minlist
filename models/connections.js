// import dependencies
require("dotenv").config() // need this to access the DATABASE_URL variable in the .env file
const mongoose = require("mongoose") // need this to connect to the mongodb database via mongoose

// setting up inputs
const MONGODB_URI = process.env.MONGODB_URI
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// establish connection with the database
mongoose.connect(MONGODB_URI, CONFIG)
const db = mongoose.connection

// feedback for open/disconnect/error events
mongoose.connection
    .on("open", () => console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log(error))

// exporting connection
module.exports = mongoose