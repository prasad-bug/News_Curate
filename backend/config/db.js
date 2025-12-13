const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("DEBUG: Checking Mongo URI...");
    console.log("DEBUG: MONGO_URI is set:", !!process.env.MONGO_URI);
    console.log("DEBUG: MONGODB_URI is set:", !!process.env.MONGODB_URI);

    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) {
      console.error("CRITICAL ERROR: No MongoDB connection string found in environment variables!");
      console.log("Please add MONGO_URI or MONGODB_URI to Render Environment variables.");
    }

    // Remove deprecated options for Mongoose 6+ (if applicable), but keeping them for now as they are harmless in older versions
    // If using Mongoose 7+, these options are defaults and can be removed. 
    // We will keep them for compatibility unless user is on very new mongoose.
    const conn = await mongoose.connect(uri, {
      // useNewUrlParser: true, // Deprecated in newer mongoose, but safe to keep for compatibility usually
      // useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
