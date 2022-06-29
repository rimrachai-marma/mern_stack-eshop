const express = require('express');
const mongoose = require('mongoose');

const { auth, admin } = require('../middleware/auth-middleware');
const Order = require('../models/order-model');

const router = new express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/orders', auth, async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).send({ message: 'No order items' });
  } else {
    try {
      const order = await Order.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      });

      res.status(201).send(order);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
});

// @desc    get order by id
// @route   GET /api/orders/:id
// @access  Private
router.get('/orders/:id', auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send({ message: 'Order not found' });
  }

  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (!order) {
      res.status(404).send({ message: 'Order not found' });
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// @desc    Update order to paid
// @route   PETCH /api/orders/:id/pay
// @access  Private
router.patch('/orders/:id/pay', auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send({ message: 'Product not found' });
  }

  const updates = Object.keys(req.body);

  const allowedUpdates = [
    'paymentMethod',
    'id',
    'status',
    'update_time',
    'name',
    'email_address'
  ];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ message: 'Invalid updates!' });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).send({ message: 'Order not found' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentMethod = req.body.paymentMethod;
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      name: req.body.name,
      email_address: req.body.email_address
    };

    const updatedOrder = await order.save();

    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders/all
// @access  Private
router.get('/orders/myorders/all', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name');
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// @desc    Update order to delivered
// @route   PATCH /api/orders/:id/deliver
// @access  Private/Admin
router.patch('/orders/:id/deliver', auth, async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send({ message: 'Order not found' });
  }

  try {
    const order = await Order.findByIdAndUpdate(id, {
      isDelivered: true,
      deliveredAt: Date.now()
    });

    if (!order) {
      res.status(404).send({ message: 'Order not found' });
    }

    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
