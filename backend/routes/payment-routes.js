const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const Product = require('../models/product-model');

const router = new express.Router();

const Environment =
  process.env.NODE_ENV === 'production'
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;

const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

router.get('/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//---> PayPal <---//
router.post('/payment/paypal', async (req, res) => {
  const items = req.body.orderItems;

  try {
    const storeItems = await Product.find({});

    const total = items.reduce((sum, item) => {
      return (
        sum +
        storeItems.find((storeItem) => storeItem._id == item.product).price *
          item.quantity
      );
    }, 0);

    const request = new paypal.orders.OrdersCreateRequest();

    request.prefer('return=representation');

    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: total,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: total
              }
            }
          },
          items: items.map((item) => {
            const storeItem = storeItems.find(
              (storeItem) => storeItem._id == item.product
            );

            return {
              name: storeItem.name,
              unit_amount: {
                currency_code: 'USD',
                value: storeItem.price
              },
              quantity: item.quantity
            };
          })
        }
      ]
    });

    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//---> Stripe <---//
router.post('/payment/stripe', async (req, res) => {
  const items = req.body.items;
  const storeItems = await Product.find({});

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item) => {
        const storeItem = storeItems.find(
          (storeItem) => storeItem._id == item.product
        );

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.price * 100 //covert to cent
          },
          quantity: item.quantity
        };
      }),
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
