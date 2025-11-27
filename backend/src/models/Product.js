// /backend/src/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String, // Will store the URL from Cloudinary
    required: true,
  },
  // We can add more fields like category, stock, etc.
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;