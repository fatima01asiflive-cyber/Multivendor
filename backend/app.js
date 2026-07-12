const express = require("express");
const ErrorHandler = require("./utils/errorHandler");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// <-- ADD THIS LINE HERE

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    });
}

//it is for error handling
app.use(ErrorHandler);

module.exports = app;