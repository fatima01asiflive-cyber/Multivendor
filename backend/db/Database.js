const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        // Resolve connection string from environment variables or fallback to local MongoDB
        const connectionString = 
            process.env.MONGO_URI || 
            process.env.DB_URL || 
            process.env.DATABASE_URL || 
            "mongodb://127.0.0.1:27017/multivendor";

        // Log target URI for quick debugging (hides password if present in standard format)
        const maskedURI = connectionString.includes("@") 
            ? connectionString.replace(/:([^:@]+)@/, ":****@") 
            : connectionString;
        console.log(`Attempting connection to: ${maskedURI}`);

        const data = await mongoose.connect(connectionString);

        console.log(`Mongodb connected with server: ${data.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDatabase;