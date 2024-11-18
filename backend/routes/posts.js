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
  console.log('Received file:', req.file);

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
    const normalizedImagePath = req.file.path.replace(/\\+/g, '/'); // Normalize the path to use forward slashes
    console.log('Normalized Image Path:', normalizedImagePath);
    newPost.image = normalizedImagePath; // Save the normalized image path
  } else {
    newPost.image = null; // Set image to null if no image was uploaded
    console.log('No image uploaded');
  }

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Return the created post as the response
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

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});

router.post('/:id/like', async (req, res) => {
  try {
    // Find the post by its ID
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment likes
    post.likes += 1;
    await post.save();

    res.status(200).json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
