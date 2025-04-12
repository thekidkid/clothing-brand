import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mockProducts from '../data/mockProducts';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImage, setCurrentImage] = useState('front');

  // Find the product from mock data
  const product = mockProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <Container>
        <Typography>Product not found</Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color');
      return;
    }
    console.log('Adding to cart:', {
      ...product,
      selectedSize,
      selectedColor
    });
  };

  return (
    <Container sx={{ py: 4, bgcolor: '#1A1A1A', minHeight: '100vh' }}>
      <IconButton 
        onClick={() => navigate('/products')}
        sx={{ color: 'white', mb: 2 }}
      >
        <ArrowBackIcon /> 
        <Typography sx={{ ml: 1, color: 'white' }}>Back to Products</Typography>
      </IconButton>

      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              bgcolor: '#2A2A2A',
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <Box
              component="img"
              src={currentImage === 'front' ? product.images.front : product.images.back}
              alt={`${product.name} ${currentImage} view`}
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
                aspectRatio: '1',
              }}
            />
            <Stack 
              direction="row" 
              spacing={2} 
              sx={{ 
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'rgba(0,0,0,0.5)',
                borderRadius: 2,
                p: 1
              }}
            >
              <Box
                component="img"
                src={product.images.front}
                alt="Front view thumbnail"
                sx={{
                  width: 60,
                  height: 60,
                  cursor: 'pointer',
                  border: currentImage === 'front' ? '2px solid #FF6B6B' : '2px solid transparent',
                  borderRadius: 1,
                  objectFit: 'cover'
                }}
                onClick={() => setCurrentImage('front')}
              />
              <Box
                component="img"
                src={product.images.back}
                alt="Back view thumbnail"
                sx={{
                  width: 60,
                  height: 60,
                  cursor: 'pointer',
                  border: currentImage === 'back' ? '2px solid #FF6B6B' : '2px solid transparent',
                  borderRadius: 1,
                  objectFit: 'cover'
                }}
                onClick={() => setCurrentImage('back')}
              />
            </Stack>
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ color: 'white' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Typography variant="h5" sx={{ color: '#FF6B6B', mb: 2 }}>
              ${product.price.toFixed(2)}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              {product.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  sx={{
                    bgcolor: 'rgba(255, 99, 71, 0.2)',
                    color: '#FF6B6B',
                    borderRadius: '4px',
                  }}
                />
              ))}
            </Stack>

            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                mb: 3,
                lineHeight: 1.8
              }}
            >
              {product.description}
            </Typography>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 3 }} />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Size</InputLabel>
              <Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                label="Size"
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.23)',
                  },
                }}
              >
                {product.sizes.map((size) => (
                  <MenuItem key={size} value={size}>{size}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Color</InputLabel>
              <Select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                label="Color"
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.23)',
                  },
                }}
              >
                {product.colors.map((color) => (
                  <MenuItem key={color} value={color}>{color}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              onClick={handleAddToCart}
              sx={{
                py: 2,
                background: 'linear-gradient(45deg, #FF6347 30%, #FFB6C1 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF6347 60%, #FFB6C1 100%)',
                },
              }}
            >
              Add to Cart
            </Button>

            {product.inStock ? (
              <Typography sx={{ color: '#4CAF50', mt: 2, textAlign: 'center' }}>
                In Stock
              </Typography>
            ) : (
              <Typography sx={{ color: '#f44336', mt: 2, textAlign: 'center' }}>
                Out of Stock
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails; 