
const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Mongodb connected successfully!");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    throw error;
  }
};

module.exports = dbConnection;