const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // connecting to database
const postRoutes = require('./routes/posts'); // post routes
const authRoutes = require('./routes/auth'); // authentication routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// connecting to mongodb
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// starting the server at specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
