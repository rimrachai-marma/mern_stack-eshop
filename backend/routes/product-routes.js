const express = require('express');
const { auth, admin } = require('../middleware/auth-middleware');

const Product = require('../models/product-model');

const router = new express.Router();

// @desc    Fetch all products, with pagination, search keyword and filtering
// @route   GET /api/products
// @access  Public

router.get('/products', async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.page) || 1;

  //search keyword
  //keyword=Somthing
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i'
        }
      }
    : {};

  // filter by brand
  //brand=Somthing
  const brands = req.query.brands
    ? {
        brand: {
          $in: req.query.brands.split(',')
        }
      }
    : {};

  // filter  by category
  //category=Somthing
  const category = req.query.category
    ? {
        category: req.query.category
      }
    : {};

  //filter by available in stock
  //availableInStock=true
  const availableInStock = !!req.query.availableInStock
    ? {
        countInStock: { $gt: 0 }
      }
    : {};

  // filter  by rating
  // rating=$gte:1/2/3/4/5
  const rating = req.query.rating
    ? {
        rating: { $gte: req.query.rating.split(':')[1] }
      }
    : {};

  //filter by price range
  //priceAt=[]to[]
  const priceAt = req.query.priceAt
    ? {
        price: {
          $gte: req.query.priceAt.split('to')[0],
          $lte: req.query.priceAt.split('to')[1]
        }
      }
    : {};

  //sorting
  const sort =
    req.query.sort && req.query.sort === 'price-desc'
      ? { price: -1 }
      : req.query.sort && req.query.sort === 'price-asc'
      ? { price: 1 }
      : req.query.sort && req.query.sort === 'review-rank'
      ? { rating: -1 }
      : { createdAt: -1 };

  try {
    const count = await Product.countDocuments({
      ...keyword,
      ...brands,
      ...category,
      ...availableInStock,
      ...rating,
      ...priceAt
    });

    const products = await Product.find({
      ...keyword,
      ...brands,
      ...category,
      ...availableInStock,
      ...rating,
      ...priceAt
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(sort);

    const pages = Math.ceil(count / pageSize);

    res.status(200).send({ products, page, pages });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
router.get('/top/products', async (req, res) => {
  const size = 5;

  const products = await Product.find({}).sort({ rating: -1 }).limit(size);

  res.status(200).json(products);
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
router.post('/products/:id/reviews', auth, async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(409).send({ message: 'Product already reviewed' });
      } else {
        const review = {
          name: req.user.name,
          rating: Number(rating),
          comment,
          user: req.user._id
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;

        await product.save();
        res.status(201).send({ message: 'Review added' });
      }
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.get('/products/all/brands', async (req, res) => {
  try {
    const products = await Product.find({}).select('brand');

    const brands = [...new Set(products.map((product) => product.brand))];
    res.send(brands);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
router.get('/products/all/categories', async (req, res) => {
  try {
    const products = await Product.find({}).select('category');

    const categories = [
      ...new Set(products.map((product) => product.category))
    ];
    res.send(categories);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//Only admin

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
router.post('/products', auth, admin, async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  try {
    const product = await Product.create({
      name: name || 'Sample name',
      price: price || 0,
      description: description || 'Sample description',
      user: req.user._id,
      image: image || '/images/sample.jpg',
      brand: brand || 'Sample brand',
      category: category || 'Sample category',
      countInStock: countInStock || 0,
      numReviews: 0
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin

router.delete('/products/:id', auth, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.status(200).send({ message: 'Product removed' });
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private/Admin
router.patch('/products/:id', auth, admin, async (req, res) => {
  const updates = Object.keys(req.body);

  const allowedUpdates = [
    'name',
    'price',
    'description',
    'image',
    'brand',
    'category',
    'countInStock'
  ];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ message: 'Invalid updates!' });
  }

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      updates.forEach((update) => (product[update] = req.body[update]));
      const updatedProduct = await product.save();

      res.status(200).send(updatedProduct);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = router;
