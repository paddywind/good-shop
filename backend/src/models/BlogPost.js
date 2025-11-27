const mongoose = require('mongoose');
const slugify = require('slugify');

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true, // NOT required
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// slug generator
blogPostSchema.pre('validate', function () {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});


module.exports = mongoose.model('BlogPost', blogPostSchema);
