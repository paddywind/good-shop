// /backend/src/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware'); // For protected routes
const { upload, uploadToCloudinary, cloudinary } = require('../middleware/cloudinaryMiddleware'); // For image uploads
const asyncHandler = require('express-async-handler');
const router = express.Router();

// ⬇️ Public Routes

// @route   GET /api/products
// @desc    Get all products (for product cards)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).select('name price imageUrl'); // Get only essential fields for cards
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔒 Protected Routes (Require JWT authentication/Admin role)

// @route   POST /api/products
// @desc    Add a new product
// @access  Protected (Requires admin privileges)
router.post(
  '/',
  protect, // Check if user is logged in
  upload.single('productImage'), // Handle image upload using Multer
  uploadToCloudinary, // Upload the image to Cloudinary and attach the URL to req.file
  async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const imageUrl = req.cloudinaryUrl; // Get the URL from the middleware

      if (!name || !description || !price || !imageUrl) {
        return res.status(400).json({ message: 'Please include all product fields and an image.' });
      }

      const product = new Product({ name, description, price, imageUrl });
      const createdProduct = await product.save();

      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Helper function to extract the Public ID from the Cloudinary URL
const extractPublicId = (imageUrl) => {
  // Assuming the path includes the folder name 'shop_products'
  const parts = imageUrl.split('/');

  // Find the index of the folder name ('shop_products')
  const folderIndex = parts.indexOf('shop_products');

  if (folderIndex > -1 && parts.length > folderIndex + 1) {
    const fileName = parts.slice(folderIndex + 1).join('/');
    // Return the folder name + file name without extension
    return 'shop_products/' + fileName.split('.')[0];
  }

  // Fallback extraction
  const idWithExtension = parts.pop();
  return idWithExtension.split('.')[0];
};

// /backend/src/routes/productRoutes.js (Add this after the POST route)

// @route   PUT /api/products/:id
// @desc    Update a product by ID
// @access  Protected (Requires admin privileges)
router.put(
  '/:id',
  protect, // Ensure user is authenticated
  upload.single('productImage'), // Optional image re-upload
  uploadToCloudinary, // Handles the image upload and sets req.cloudinaryUrl if a file is present
  asyncHandler(async (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = req.cloudinaryUrl; // New image URL if uploaded

    // 1. Find the product by ID
    const product = await Product.findById(req.params.id);

    if (product) {

      // 2. Update fields if provided (partial update)
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;

      // 3. Handle optional image replacement
      if (imageUrl) {
        // If a new image was uploaded:
        // A. Optionally delete the old image from Cloudinary
        try {
          const publicId = extractPublicId(product.imageUrl);
          await cloudinary.uploader.destroy(publicId);
        } catch (e) {
          console.error("Failed to delete old Cloudinary image:", e);
          // Non-critical error, proceed with DB update
        }

        // B. Update to the new URL
        product.imageUrl = imageUrl;
      }

      // 4. Save the updated product
      const updatedProduct = await product.save();
      res.json(updatedProduct);

    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);


// /backend/src/routes/productRoutes.js (Add this after the PUT route)

// @route   DELETE /api/products/:id
// @desc    Delete a product by ID
// @access  Protected (Requires admin privileges)
router.delete(
  '/:id',
  protect, // Ensure user is authenticated
  asyncHandler(async (req, res) => {
    // 1. Find the product by ID
    const product = await Product.findById(req.params.id);

    if (product) {

      // 2. Delete the image from Cloudinary
      try {
        const publicId = extractPublicId(product.imageUrl);
        await cloudinary.uploader.destroy(publicId);
      } catch (e) {
        console.error("Cloudinary Deletion Error (Product):", e);
        // We log the error but proceed with DB deletion to avoid orphaned DB records
      }

      // 3. Delete the database record
      await product.deleteOne();

      res.json({ message: 'Product and associated image removed successfully' });

    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);


module.exports = router;