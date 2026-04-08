const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // These options are no longer needed in Mongoose 7+
            // but kept for backwards compatibility if needed
        });
        console.log("Database connection successful");
        return conn;
    } catch (error) {
        console.error("Database connection failed:", error.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB

