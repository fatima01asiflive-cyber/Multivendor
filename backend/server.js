// 1. Uncaught exceptions handler MUST be at the very top
process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception Error: ${err.message}`);
    console.error("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

const dns = require("dns");
// Force Node.js to use Cloudflare/Google DNS to bypass local ISP blocks with Atlas
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const path = require("path");

// Load .env variables before any other module imports
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = require("./app");
const dbConnection = require("./db/Database");

// Connection to database
dbConnection();

// Start server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    console.error("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});