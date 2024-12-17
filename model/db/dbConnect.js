const mongoose = require("mongoose");
require('dotenv').config();

async function dbConnect() {
    mongoose.connect(
        process.env.CONNECTION_STRING,
    )
        .then(() => {
            console.log('Successfully connected to the database');
        })
        .catch((err) => {
            console.log("Unable to connect to the database");
            console.error(err);
        })
}

module.exports = dbConnect;
