import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Rating,
  Tabs,
  Tab,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CachedIcon from '@mui/icons-material/Cached';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import mockProducts from '../data/mockProducts';
import ProductCard from '../components/ProductCard';

// Get product by ID from mock data
const getProductById = (id) => {
  return mockProducts.find(product => product.id === parseInt(id));
};

const relatedProducts = [
  {
    id: 2,
    name: 'Classic Denim Jacket',
    price: 89.99,
    category: 'Jackets',
    rating: 4.8,
    reviewCount: 84,
    isNewArrival: true
  },
  {
    id: 3,
    name: 'Urban Hoodie',
    price: 59.99,
    category: 'Hoodies',
    rating: 4.6,
    reviewCount: 156,
    isHotDeal: true
  },
  {
    id: 4,
    name: 'Vintage T-Shirt',
    price: 34.99,
    category: 'T-Shirts',
    rating: 4.7,
    reviewCount: 92,
    isTrending: true
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart, toggleWishlist, wishlistItems } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Product not found</Alert>
      </Container>
    );
  }

  const productImages = [
    { src: product.images?.front, alt: `${product.name} front view` },
    { src: product.images?.back, alt: `${product.name} back view` }
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const isInWishlist = wishlistItems?.some(item => item.id === product.id) || false;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<FavoriteBorderIcon />}
        onClick={() => navigate('/products')}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
            <Box
              component="img"
              src={productImages[currentImageIndex].src}
              alt={productImages[currentImageIndex].alt}
              sx={{
                width: '100%',
                borderRadius: 2,
                objectFit: 'cover',
                aspectRatio: '3/4',
                display: 'block'
              }}
            />
            
            {/* Navigation Arrows */}
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          {/* Thumbnails */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {productImages.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setCurrentImageIndex(index)}
                sx={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 1,
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: currentImageIndex === index ? '2px solid #FF6B6B' : '2px solid transparent',
                  transition: 'border-color 0.2s',
                  '&:hover': {
                    border: '2px solid #FF6B6B'
                  }
                }}
              />
            ))}
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            {product.tags?.includes('Best Seller') && (
              <Chip
                label="Best Seller"
                sx={{
                  backgroundColor: '#FF6B6B',
                  color: 'white',
                  position: 'absolute',
                  top: 0,
                  right: 0
                }}
              />
            )}
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating || 0} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                ({product.reviewCount || 0} reviews)
              </Typography>
            </Box>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price?.toFixed(2)}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>

            {/* Size Selection */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Size</InputLabel>
              <Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                label="Select Size"
              >
                {product.sizes?.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Color Selection */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Color</InputLabel>
              <Select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                label="Select Color"
              >
                {product.colors?.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Success Message */}
            {showSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Product added to cart successfully!
              </Alert>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
              >
                Add to Cart
              </Button>
              <IconButton
                onClick={() => toggleWishlist?.(product)}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  width: 56
                }}
              >
                {isInWishlist ? (
                  <FavoriteIcon sx={{ color: '#FF6B6B' }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>

            {/* Shipping Info */}
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <LocalShippingIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2">Free Shipping</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <CachedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2">30 Days Return</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <VerifiedUserIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2">Secure Payment</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Product Features */}
            {product.features && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Product Features
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {product.features.map((feature, index) => (
                    <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                      • {feature}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Related Products */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          You May Also Like
        </Typography>
        <Grid container spacing={3}>
          {relatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetail; 