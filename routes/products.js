const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create product
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, category, sizes, colors, stock, featured } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      category,
      sizes: JSON.parse(sizes),
      colors: JSON.parse(colors),
      stock,
      featured,
      images: req.files.map(file => file.path)
    });

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update product
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, category, sizes, colors, stock, featured } = req.body;
    
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
    product.colors = colors ? JSON.parse(colors) : product.colors;
    product.stock = stock || product.stock;
    product.featured = featured !== undefined ? featured : product.featured;
    
    if (req.files && req.files.length > 0) {
      product.images = [...product.images, ...req.files.map(file => file.path)];
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await product.remove();
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 