const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('<username>')) {
      console.warn("Warning: MONGO_URI not configured in .env file.");
      console.warn("Skipping database connection...");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
