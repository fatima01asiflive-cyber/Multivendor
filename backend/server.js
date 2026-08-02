const dns = require("dns");
// Force Node.js to use Cloudflare/Google DNS to bypass local ISP blocks with Atlas
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const path = require("path");

// Load .env variables before any other module imports
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = require("./app");
const connectDatabase = require("./db/Database");

// Handling uncaught exceptions (must exit process to free bound ports)
process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception Error: ${err.message}`);
    console.error("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

// Start server immediately, then attempt DB connection with retry
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const startDbWithRetry = async (attempt = 1) => {
    try {
        await connectDatabase();
    } catch (error) {
        console.error(`MongoDB connection attempt ${attempt} failed: ${error.message}`);
        const retryDelay = 5000; // ms
        console.log(`Retrying MongoDB connection in ${retryDelay / 1000}s...`);
        setTimeout(() => startDbWithRetry(attempt + 1), retryDelay);
    }
};

startDbWithRetry();

// Unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    console.error("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});
