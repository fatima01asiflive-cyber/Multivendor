const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");

// Load .env at the VERY TOP so environment variables exist everywhere
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: path.join(__dirname, ".env")
    });
}

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Configured CORS for frontend integration
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:3000"],
        credentials: true
    })
);

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/backend/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const user = require("./controller/user");
app.use("/api/v2/user", user);

// Error Middleware (must be last)
app.use(errorMiddleware);

module.exports = app;