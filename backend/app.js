const express = require("express");
const path = require("path");
const errorMiddleware = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.urlencoded({ extended: true }));


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: path.join(__dirname, ".env")
    });
}

//import routes
const user = require("./controller/user");
app.use("/api/v2/user", user);

//it is for error handling
app.use(errorMiddleware);

module.exports = app;