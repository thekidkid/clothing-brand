import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Menu as MenuIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              fontSize: '1.8rem',
              letterSpacing: '0.2em',
              fontFamily: '"Orbitron", sans-serif',
              background: 'linear-gradient(45deg, #00C6FF, #92FE9D)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(0,198,255,0.3)',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            RYNE
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={RouterLink} to="/" onClick={handleClose}>
                  Home
                </MenuItem>
                <MenuItem component={RouterLink} to="/products" onClick={handleClose}>
                  Products
                </MenuItem>
                <MenuItem component={RouterLink} to="/login" onClick={handleClose}>
                  Login
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/"
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/products"
              >
                Products
              </Button>
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/cart"
              >
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/profile"
              >
                <Person />
              </IconButton>
              <Button
                color="inherit"
                variant="outlined"
                component={RouterLink}
                to="/login"
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 