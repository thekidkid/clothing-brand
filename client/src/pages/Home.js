import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Box,
  Paper,
  Divider,
  Stack,
  Fade,
  IconButton,
  Slide,
  Zoom,
  useTheme,
  useMediaQuery,
  Rating,
  Chip,
  Avatar,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PaymentsIcon from '@mui/icons-material/Payments';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InstagramIcon from '@mui/icons-material/Instagram';
import { DryCleaningOutlined, CheckroomOutlined, AccessibilityNew, Style, LocalMall, Diamond } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      id: 1,
      name: 'Streetwear',
      icon: <Style sx={{ fontSize: 80 }} />,
      description: 'Urban fashion that makes a statement',
    },
    {
      id: 2,
      name: 'Accessories',
      icon: <Diamond sx={{ fontSize: 80 }} />,
      description: 'Complete your look with our premium accessories',
    },
    {
      id: 3,
      name: 'Limited Edition',
      icon: <LocalMall sx={{ fontSize: 80 }} />,
      description: 'Exclusive drops and collector items',
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Bear Logo T-Shirt',
      price: 39.99,
      description: 'Premium cotton t-shirt featuring our iconic bear logo',
      category: 'T-Shirts',
      images: {
        front: 'images/bearshirt2.png',
        back: 'images/bearshirt.png'
      },
      tags: ['New', 'Featured', 'Best Seller']
    }
  ];

  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Express Shipping',
      description: 'Free on orders over $100',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Shopping',
      description: 'Safe & reliable payment',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Always here to help',
    },
    {
      icon: <PaymentsIcon sx={{ fontSize: 40 }} />,
      title: 'Money Back',
      description: '30 days guarantee',
    },
  ];

  const instagramPosts = [
    {
      id: 1,
      image: '/images/insta-1.jpg',
      likes: 1234,
      username: '@streetstyle',
    },
    {
      id: 2,
      image: '/images/insta-2.jpg',
      likes: 987,
      username: '@urbanfashion',
    },
    {
      id: 3,
      image: '/images/insta-3.jpg',
      likes: 2345,
      username: '@fashionista',
    },
    {
      id: 4,
      image: '/images/insta-4.jpg',
      likes: 1567,
      username: '@styleicon',
    },
  ];

  return (
    <Fade in={isLoaded} timeout={1000}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#0A0A0A' }}>
        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            mt: '-64px',
          }}
        >
          {/* Background Image */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/images/soup_man69_a_tough_cartoon_teddy_bear_with_stitches_and_piercin_25deba4f-7dd1-47bf-bea9-847134417980-removebg-preview.png)',
              backgroundSize: '60%',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#0A0A0A',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, #0A0A0A 30%, rgba(10,10,10,0.4) 100%)',
                zIndex: 1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at right center, rgba(255,99,71,0.15) 0%, rgba(10,10,10,0) 70%)',
                zIndex: 2,
                pointerEvents: 'none',
              }
            }}
          />
          
          {/* Hero Content */}
          <Container
            maxWidth="lg"
            sx={{
              position: 'relative',
              zIndex: 2,
              pt: '64px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Box sx={{ maxWidth: '50%' }}>
                <Typography
                  variant="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 900,
                    fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                    lineHeight: 1.1,
                    mb: 2,
                    textTransform: 'uppercase',
                    background: 'linear-gradient(45deg, #FF6347 0%, #FFB6C1 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px rgba(255,99,71,0.3)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Elevate Your Style
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    maxWidth: 500,
                    fontSize: { xs: '1.2rem', md: '1.5rem', lg: '1.8rem' },
                    fontWeight: 300,
                    mb: 4,
                    lineHeight: 1.4,
                    textShadow: '0 0 20px rgba(0,0,0,0.5)',
                  }}
                >
                  Discover our exclusive collection of premium streetwear designed for those who dare to stand out.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    component={RouterLink}
                    to="/products"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #FF6347 30%, #FFB6C1 90%)',
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      boxShadow: '0 8px 16px rgba(255,99,71,0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #FF6347 60%, #FFB6C1 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 20px rgba(255,99,71,0.4)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Shop Now
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/about"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: 'white',
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#FF6347',
                        backgroundColor: 'rgba(255,99,71,0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Our Story
                  </Button>
                </Stack>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ py: 8 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(255,99,71,0.1) 0%, rgba(255,182,193,0.1) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          mb: 2,
                          color: '#FF6347',
                          transform: 'scale(1.2)',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: 'white',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Featured Products */}
        <Box sx={{ py: 8, background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(255,99,71,0.05) 100%)' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 6,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #FF6347 30%, #FFB6C1 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Featured Collection
            </Typography>
            <Grid container spacing={4}>
              {featuredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Categories Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 6,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FF6347 30%, #FFB6C1 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Shop by Category
          </Typography>
          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} md={4} key={category.id}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      background: 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        background: 'rgba(255,99,71,0.1)',
                        '& .category-icon': {
                          color: '#FF6347',
                          transform: 'scale(1.1) rotate(5deg)',
                        }
                      }
                    }}
                  >
                    <Box
                      className="category-icon"
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2,
                        color: 'rgba(255,255,255,0.7)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {category.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      align="center"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: 'white'
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{
                        color: 'rgba(255,255,255,0.7)'
                      }}
                    >
                      {category.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Fade>
  );
};

export default Home;
