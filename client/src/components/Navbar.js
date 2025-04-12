import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Badge,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { cartItems, wishlistItems } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" color="default" sx={{ bgcolor: 'background.default' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 0,
            textDecoration: 'none',
            color: 'text.primary',
            fontWeight: 'bold',
            mr: 4
          }}
        >
          R
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{
              borderBottom: isActive('/') ? '2px solid #FF6B6B' : 'none',
              '&:hover': { borderBottom: '2px solid #FF6B6B' }
            }}
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/products"
            color="inherit"
            sx={{
              borderBottom: isActive('/products') ? '2px solid #FF6B6B' : 'none',
              '&:hover': { borderBottom: '2px solid #FF6B6B' }
            }}
          >
            Products
          </Button>
          <Button
            component={RouterLink}
            to="/about"
            color="inherit"
            sx={{
              borderBottom: isActive('/about') ? '2px solid #FF6B6B' : 'none',
              '&:hover': { borderBottom: '2px solid #FF6B6B' }
            }}
          >
            About
          </Button>
          <Button
            component={RouterLink}
            to="/contact"
            color="inherit"
            sx={{
              borderBottom: isActive('/contact') ? '2px solid #FF6B6B' : 'none',
              '&:hover': { borderBottom: '2px solid #FF6B6B' }
            }}
          >
            Contact
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            component={RouterLink}
            to="/wishlist"
            color="inherit"
            size="large"
          >
            <Badge badgeContent={wishlistItems?.length || 0} color="primary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton
            component={RouterLink}
            to="/cart"
            color="inherit"
            size="large"
          >
            <Badge badgeContent={cartItems?.length || 0} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton
            component={RouterLink}
            to="/profile"
            color="inherit"
            size="large"
          >
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 