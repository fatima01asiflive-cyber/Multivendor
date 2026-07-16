const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Forces Node.js to use Cloudflare/Google DNS to bypass ISP blocks

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = require("./app");
const connectDatabase = require("./db/Database");

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
});

//create db
connectDatabase();

//create server
const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT || 8000}`);
});

// underhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});

