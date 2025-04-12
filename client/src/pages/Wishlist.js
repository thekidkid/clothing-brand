import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useCart();
  const navigate = useNavigate();

  if (wishlistItems.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ 
          py: 8, 
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="h4" gutterBottom>
            Your Wishlist is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Add items you love to your wishlist. Review them anytime and easily move them to your cart.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Explore Products
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Wishlist
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
        </Typography>
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ProductCard 
                product={item}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Wishlist; 