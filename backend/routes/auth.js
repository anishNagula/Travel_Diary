const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import the User model

// POST route for registering a new user
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user (MongoDB will automatically generate an `_id` for us)
    const newUser = new User({
      email,
      username,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with the newly created user
    res.status(201).json({
      msg: 'User created successfully',
      user: {
        id: newUser._id,   // MongoDB will auto-generate the `_id`
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST route for logging in an existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare passwords (in real scenarios, hash passwords before comparing)
    if (user.password !== password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Respond with the user details (excluding password for security)
    res.status(200).json({
      msg: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  try {
    // Clear any server-side session or cookie if using sessions or tokens
    req.session = null; // Example if using sessions
    res.status(200).json({ msg: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
