import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Get the public URL for images
  const getPublicUrl = (path) => {
    if (!path) return '';
    const cleanPath = path.replace(/^\/+/, '');
    return cleanPath;
  };

  // Safely get image URL - showing back image by default
  const getImageUrl = () => {
    if (!product?.images) return '';
    const imagePath = isHovered ? product.images.front : product.images.back;
    return getPublicUrl(imagePath);
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    setImageError(true);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  if (!product) {
    return null;
  }

  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
        backgroundColor: '#1A1A1A',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative', paddingTop: '100%', bgcolor: '#2A2A2A' }}>
        {!imageError && (
          <CardMedia
            component="img"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transition: 'opacity 0.3s ease-in-out',
              p: 2,
            }}
            image={getImageUrl()}
            onError={handleImageError}
            alt={`${product.name || 'Product'} ${isHovered ? 'front view' : 'back view'}`}
          />
        )}
      </Box>

      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
          zIndex: 1,
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
        }}
        aria-label="Add to wishlist"
      >
        {isWishlisted ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>

      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'white' }}>
          {product.name || 'Untitled Product'}
        </Typography>
        <Typography variant="body1" sx={{ color: '#FF6B6B' }}>
          ${(product.price || 0).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 