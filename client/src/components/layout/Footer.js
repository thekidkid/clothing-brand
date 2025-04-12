import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  Pinterest,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{
              fontFamily: '"Orbitron", sans-serif',
              background: 'linear-gradient(45deg, #00C6FF, #92FE9D)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(0,198,255,0.3)'
            }}>
              RYNE
            </Typography>
            <Typography variant="body2">
              Your go-to destination for trendy and sustainable fashion.
              We believe in quality, style, and responsible manufacturing.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link
              component={RouterLink}
              to="/products"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              Shop
            </Link>
            <Link
              component={RouterLink}
              to="/about"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              About Us
            </Link>
            <Link
              component={RouterLink}
              to="/contact"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              Contact
            </Link>
            <Link
              component={RouterLink}
              to="/shipping"
              color="inherit"
              display="block"
            >
              Shipping Info
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
              <IconButton color="inherit">
                <Instagram />
              </IconButton>
              <IconButton color="inherit">
                <Twitter />
              </IconButton>
              <IconButton color="inherit">
                <Pinterest />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Subscribe to our newsletter for updates and exclusive offers!
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} RYNE. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 