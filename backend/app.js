const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error");

// Load .env at the VERY TOP so environment variables exist everywhere
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: path.join(__dirname, ".env"),
    });
}

// Initialize Express App (Declared once)
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Configured CORS for frontend integration
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials: true,
    })
);

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Serve static upload files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Simple health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

// Import routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/v2/user", userRoutes);

// Error Middleware (must be last & match import name)
app.use(errorHandler);

module.exports = app;