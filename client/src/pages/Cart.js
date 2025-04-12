import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Paper,
  Grid,
  TextField,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const shippingCost = 5.99;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4, mt: 2 }}>
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Paper
              key={item.id}
              sx={{
                p: 2,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: 'background.paper',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 1
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${item.price.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  size="small"
                  value={item.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    handleQuantityChange(item.id, value);
                  }}
                  inputProps={{
                    style: { textAlign: 'center', width: '40px' }
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleRemove(item.id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, backgroundColor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>${getCartTotal().toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping</Typography>
                <Typography>${shippingCost.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">
                  ${(getCartTotal() + shippingCost).toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 