const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/user-model');
const Cart = require('../models/cart-model');
const { auth, admin } = require('../middleware/auth-middleware');

const router = new express.Router();

//@desc   register users
//@route  POST /api/users/
//@access Public route
router.post('/users', async (req, res) => {
  const { name, email, password, gender } = req.body;

  try {
    const user = await User.create({ name, email, password, gender });

    const token = await user.generateAuthToken();
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      gender: user.gender,
      token
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: 'User already exists' });
    } else {
      res.status(400).send({ message: error.message });
    }
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      gender: user.gender,
      token
    });
  } catch (error) {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

// @desc    User logout
// @route   POST /api/users/logout
// @access  Private
router.post('/users/logout', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.tokens = user.tokens.filter((t) => {
      return t.token !== req.token;
    });
    await user.save();

    res.status(200).send({ message: 'Successfuly logout!' });
  } catch (error) {
    res.status(500).send({ message: 'Logout field' });
  }
});

// @desc    User logout all divice
// @route   POST /api/users/logoutAll
// @access  Private
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.tokens = [];
    await user.save();
    res.status(200).send({ message: 'Successfuly logout!' });
  } catch (error) {
    res.status(500).send({ message: 'Logout field' });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/users/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -tokens ');
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      gender: user.gender,
      avatar: user.avatar ? true : false
    });
  } catch (error) {
    res.status(404).send({ message: 'User not found' });
  }
});

// @desc    Delete user profile
// @route   GET /api/users/profile
// @access  Private
router.delete('/users/profile', auth, async (req, res) => {
  try {
    await req.user.remove();
    await Cart.findOneAndRemove({ user: req.user._id });

    // Send Cancelation Email

    res.status(200).send({ message: 'User delete Succsess!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
router.patch('/users/profile', auth, async (req, res) => {
  const updates = Object.keys(req.body);

  const allowedUpdates = ['name', 'email', 'password', 'gender'];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ message: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.user._id);
    updates.forEach((update) => (user[update] = req.body[update]));
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      gender: updatedUser.gender
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

/* Admin Routes */

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password -tokens -avatar');
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
router.get('/users/:id', auth, admin, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send({ message: 'User not found' });
  }

  try {
    const user = await User.findById(req.params.id).select(
      '-password -tokens -avatar'
    );
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/users/:id', auth, admin, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send({ message: 'User not found' });
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send({ message: 'User not found' });
    }
    await user.remove();

    res.status(200).send({ message: 'User removed' });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// @desc    Update user
// @route   PATCH /api/users/:id
// @access  Private/Admin
router.patch('/users/:id', auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send({ message: 'User not found' });
  }

  const updates = Object.keys(req.body);

  const allowedUpdates = ['name', 'email', 'isAdmin', 'gender'];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ message: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    }
    updates.forEach((update) => (user[update] = req.body[update]));
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      gender: updatedUser.gender
    });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

// Upload user avatar image
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image!'));
    }

    cb(undefined, true);
  }
});

// @desc    Upload user avatar image
// @route   POST /users/me/avatar
// @access  Private
router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send({ message: 'Image upload succesfully.' });
  },
  (error, req, res, next) => {
    res.status(400).send({ message: error.message });
  }
);

// @desc    Delete user avatar image
// @route   DELETE /users/me/avatar
// @access  Private
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// @desc    get user avatar image
// @route   get /users/:id/avatar
// @access  Private
router.get('/users/:id/avatar', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send({ message: 'User not found' });
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error('User not found!');
    }

    if (user && !user.avatar) {
      throw new Error('No profile image found!');
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});

module.exports = router;
