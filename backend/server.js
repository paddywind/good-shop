// /backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests from Next.js frontend
app.use(express.json()); // Body parser for JSON data

// 📦 MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};
connectDB();

// 🛣️ Import Routes
const productRoutes = require('./src/routes/productRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const authRoutes = require('./src/routes/authRoutes');

// ➡️ Use Routes
app.use('/api/products', productRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/auth', authRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));