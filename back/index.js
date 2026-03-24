const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/config/db');
const healthRoutes = require('./src/routes/health');
const eventRoutes = require('./src/routes/events');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes setup
app.use('/api/health', healthRoutes);
app.use('/api/events', eventRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
