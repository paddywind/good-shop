// /backend/src/routes/authRoutes.js
const express = require('express');
const User = require('../models/User');
const { generateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Helper function for user authentication and sending response
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if user exists AND if the password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // Generate and send the JWT
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authUser);

// @route   POST /api/auth/admin-register
// @desc    Register a new admin (use this once to create your first admin user)
// @access  Public (should be protected in production after first use)
router.post('/admin-register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the user and set them as an admin
    const user = await User.create({ email, password, isAdmin: true });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;