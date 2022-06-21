const express = require('express');

const { auth } = require('../middleware/auth-middleware');
const Cart = require('../models/cart-model');
const Product = require('../models/product-model');

const router = new express.Router();

router.put('/cart', auth, async (req, res) => {
  const user = req.user._id;
  const { cartItems, totalQuantity, totalAmount } = req.body;

  try {
    const cart = await Cart.findOne({ user });

    if (!cart) {
      const createdCart = await Cart.create({
        user: user,
        cartItems,
        totalQuantity,
        totalAmount
      });

      res.status(201).send(createdCart);
    } else {
      const updatedCart = await cart.update({
        user: user,
        cartItems,
        totalQuantity,
        totalAmount
      });

      res.status(201).send(updatedCart);
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
    console.log(error.message);
  }
});

router.get('/cart', auth, async (req, res) => {
  const user = req.user._id;
  try {
    const cart = await Cart.findOne({ user });
    res.send(cart);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put('/cart/add', auth, async (req, res) => {
  const user = req.user._id;
  const { cartItemId } = req.body;

  try {
    const cart = await Cart.findOne({ user });

    const newItem = await Product.findById(cartItemId);

    const existingItem = cart.cartItems.find(
      (item) => item.product == cartItemId
    );

    let updatedTA = cart.totalAmount + newItem.price;

    cart.totalQuantity++;
    cart.totalAmount = updatedTA.toFixed(2);

    if (!existingItem) {
      cart.cartItems.push({
        product: newItem._id,
        price: newItem.price,
        quantity: 1,
        totalPrice: newItem.price
      });
    } else {
      existingItem.quantity++;
      let updatedTP = existingItem.totalPrice + newItem.price;
      existingItem.totalPrice = updatedTP.toFixed(2);
    }

    const updatedCart = await cart.save();
    res.send(updatedCart);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.put('/cart/remove', auth, async (req, res) => {
  const user = req.user._id;
  const { cartItemId } = req.body;

  try {
    const cart = await Cart.findOne({ user });

    const existingItem = cart.cartItems.find(
      (item) => item.product == cartItemId
    );

    cart.totalQuantity--;
    let updatedTA = cart.totalAmount - existingItem.price;
    cart.totalAmount = updatedTA.toFixed(2);

    if (existingItem.quantity == 1) {
      cart.cartItems = cart.cartItems.filter(
        (item) => item.product != cartItemId
      );
    } else {
      existingItem.quantity--;
      let updatedTP = existingItem.totalPrice - existingItem.price;
      existingItem.totalPrice = updatedTP.toFixed(2);
    }

    const updatedCart = await cart.save();
    res.send(updatedCart);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
