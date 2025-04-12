const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Handle Stripe webhook
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Update order status
      await Order.findOneAndUpdate(
        { transactionId: paymentIntent.id },
        { paymentStatus: 'completed' }
      );
      break;
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      // Update order status
      await Order.findOneAndUpdate(
        { transactionId: failedPaymentIntent.id },
        { paymentStatus: 'failed' }
      );
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router; 