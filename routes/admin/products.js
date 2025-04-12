const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../../models/Product');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Test route to add a sample product (no file upload required)
router.get('/add-sample', async (req, res) => {
  try {
    const sampleProduct = new Product({
      name: 'Essential Streetwear Hoodie',
      description: 'Premium quality hoodie with minimalist design. Perfect for any streetwear enthusiast.',
      price: 79.99,
      category: 'T-Shirts',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black', 'Gray'],
      websiteUrl: 'http://localhost:3000/products/essential-hoodie',
      stockQuantity: 50,
      tags: ['streetwear', 'hoodie', 'essential'],
      images: ['/uploads/products/placeholder.jpg']
    });

    const savedProduct = await sampleProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error adding sample product:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new product
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map(file => `/uploads/products/${file.filename}`) : [];
    
    const product = new Product({
      ...req.body,
      images: imageUrls,
      sizes: JSON.parse(req.body.sizes || '[]'),
      colors: JSON.parse(req.body.colors || '[]'),
      tags: JSON.parse(req.body.tags || '[]')
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Handle new images if uploaded
    const imageUrls = req.files ? req.files.map(file => `/uploads/products/${file.filename}`) : [];
    const updatedImages = imageUrls.length > 0 ? imageUrls : product.images;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images: updatedImages,
        sizes: JSON.parse(req.body.sizes || '[]'),
        colors: JSON.parse(req.body.colors || '[]'),
        tags: JSON.parse(req.body.tags || '[]')
      },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product status (active/inactive)
router.patch('/:id/status', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update stock quantity
router.patch('/:id/stock', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { 
        stockQuantity: req.body.stockQuantity,
        inStock: req.body.stockQuantity > 0
      },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 