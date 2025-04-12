const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.product');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user's orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('items.product')
      .sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product');
    
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ msg: `Product not found: ${item.product}` });
      }
      totalAmount += product.price * item.quantity;
    }

    const order = new Order({
      user: req.body.userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { orderStatus } = req.body;
    
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    order.orderStatus = orderStatus;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 