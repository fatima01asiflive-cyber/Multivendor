const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        // Prefer environment-provided URI, fallback to DB_URL, then to a local default
        const connectionString = process.env.MONGO_URI || process.env.DB_URL || "mongodb://127.0.0.1:27017/multivendor";

        const data = await mongoose.connect(connectionString);

        console.log(`Mongodb connected with server: ${data.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDatabase;

