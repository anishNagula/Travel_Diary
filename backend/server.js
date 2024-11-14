const express = require('express');
const corsOptions = {
  origin: 'https://yourfrontenddomain.vercel.app', // replace with your actual frontend URL
  methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));
const connectDB = require('./config/db'); // Updated to match the filename you used
const postRoutes = require('./routes/posts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Express has a built-in body parser, so this replaces body-parser

// Serve static files from 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/posts', postRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
