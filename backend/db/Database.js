const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const data = await mongoose.connect(process.env.DB_URL);
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        // Optional: Exit process if connection fails
        process.exit(1); 
    }
};

module.exports = connectDatabase;