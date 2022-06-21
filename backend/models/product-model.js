const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

productSchema.pre('save', function (next) {
  const words = this.brand.split(' ');

  this.brand = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  next();
});

productSchema.pre('save', function (next) {
  const words = this.category.split(' ');

  this.category = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
