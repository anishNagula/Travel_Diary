const express = require('express');
const Post = require('../models/post.js');
const multer = require('multer'); // Import multer for handling file uploads
const path = require('path');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
  },
});

const upload = multer({ storage });

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new post with optional image upload
router.post('/', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({
    title,
    content,
    profilePic: 'https://robohash.org/default?size=20x20',
    username: 'You',
    likes: 0,
    comments: [],
  });

  // Check if an image was uploaded
  if (req.file) {
    newPost.image = req.file.path; // Save the image path if an image was uploaded
  } else {
    newPost.image = null; // Set image to null if no image was uploaded
  }

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a comment to a post
router.post('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Assuming req.body contains the comment data
    post.comments.push(req.body); 
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;