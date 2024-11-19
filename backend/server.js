const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // Database connection
const postRoutes = require('./routes/posts'); // Post routes
const authRoutes = require('./routes/auth'); // Authentication routes (for signup)
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Serve static files from 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/posts', postRoutes); // Post routes
app.use('/api/auth', authRoutes);  // Authentication routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
