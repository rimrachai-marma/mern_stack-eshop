const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.']
  },

  totalPrice: {
    type: Number,
    required: true
  }
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    cartItems: [cartItemSchema],

    totalQuantity: {
      type: Number,
      required: true,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0
    }
  },
  {
    timestamps: true
  }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
