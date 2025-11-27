// /backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

// Function to generate the JWT (used in the auth route)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in the header (Bearer TOKEN)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user data based on the ID in the token, but exclude password
      req.user = await User.findById(decoded.id).select('-password');

      // We must ensure the user is an admin for CRUD routes
      if (req.user && req.user.isAdmin) {
        next(); // User is authenticated and an admin, proceed!
      } else {
        res.status(401).json({ message: 'Not authorized, must be an administrator' });
      }

    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect, generateToken };