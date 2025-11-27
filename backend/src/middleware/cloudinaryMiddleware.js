// /backend/src/middleware/cloudinaryMiddleware.js (REVISED)
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

// 1. Configure Cloudinary
// If CLOUDINARY_URL is present, the configure() call will read it automatically.
// We don't need to pass an object of keys/secrets if the URL is set.
cloudinary.config();

// 2. Define Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    // Determine the folder based on the route or file type
    // We assume 'productImage' for shop and 'featuredImage' for blog
    let folder;
    if (file.fieldname === 'productImage') {
      folder = 'shop_products';
    } else if (file.fieldname === 'featuredImage') {
      folder = 'blog_posts';
    } else {
      folder = 'misc';
    }

    return {
      folder: folder,
      allowed_formats: ['jpeg', 'png', 'jpg'],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  },
});

// 3. Define Multer Instance
const upload = multer({ storage: storage });

// 4. Custom Middleware to Extract Cloudinary URL
const uploadToCloudinary = (req, res, next) => {
  if (req.file) {
    req.cloudinaryUrl = req.file.path;
    next();
  } else {
    next();
  }
};

module.exports = {
  upload,
  uploadToCloudinary,
  cloudinary
};