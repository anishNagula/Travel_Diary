const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db'); // Updated to match the filename you used
const postRoutes = require('./routes/posts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Express has a built-in body parser, so this replaces body-parser

// Serve static files from 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/posts', postRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
