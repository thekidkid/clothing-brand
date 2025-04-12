import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Rating,
  MenuItem,
  Snackbar,
  Alert,
  Divider,
  useTheme,
  IconButton,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import mockProducts from '../data/mockProducts';

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
    productId: '',
    rating: 5,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (newValue) => {
    setFormData(prev => ({
      ...prev,
      rating: newValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
      productId: '',
      rating: 5,
    });
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, rgba(255,107,107,0.05) 0%, rgba(78,205,196,0.05) 100%)',
        minHeight: '100vh',
        pt: 8,
        pb: 12
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 2
            }}
          >
            Get in Touch
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            We'd love to hear from you! Whether you have a question about our products, need support,
            or want to share your experience, we're here to help.
          </Typography>
        </Box>

        {/* Contact Info Cards */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                textAlign: 'center',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Box sx={{ mb: 2 }}>
                <EmailIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              </Box>
              <Typography variant="h6" gutterBottom>Email Us</Typography>
              <Typography variant="body2" color="text.secondary">
                akrissly@gmail.com
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                textAlign: 'center',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Box sx={{ mb: 2 }}>
                <LocationOnIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              </Box>
              <Typography variant="h6" gutterBottom>Visit Us</Typography>
              <Typography variant="body2" color="text.secondary">
                Evje Sentrum
                <br />
                4735 Evje, Norway
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                textAlign: 'center',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Box sx={{ mb: 2 }}>
                <PhoneIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              </Box>
              <Typography variant="h6" gutterBottom>Call Us</Typography>
              <Typography variant="body2" color="text.secondary">
                +47 469 68 290
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Message Form */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <EmailIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                <Typography variant="h5">Send a Message</Typography>
              </Box>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  variant="filled"
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  variant="filled"
                />
                <TextField
                  fullWidth
                  select
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  variant="filled"
                >
                  <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                  <MenuItem value="Order Support">Order Support</MenuItem>
                  <MenuItem value="Product Question">Product Question</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  variant="filled"
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    height: '56px',
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ff8e8e, #71d7d0)',
                    }
                  }}
                >
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Review Form */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <RateReviewIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                <Typography variant="h5">Write a Review</Typography>
              </Box>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  variant="filled"
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  variant="filled"
                />
                <TextField
                  fullWidth
                  select
                  label="Select Product"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  variant="filled"
                >
                  {mockProducts.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Box sx={{ mb: 3 }}>
                  <Typography component="legend" sx={{ mb: 1 }}>Rating</Typography>
                  <Rating
                    name="rating"
                    value={formData.rating}
                    onChange={(event, newValue) => handleRatingChange(newValue)}
                    size="large"
                  />
                </Box>
                <TextField
                  fullWidth
                  label="Your Review"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  variant="filled"
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    height: '56px',
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ff8e8e, #71d7d0)',
                    }
                  }}
                >
                  Submit Review
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>

        {/* Social Media Links */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Connect With Us</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <IconButton 
              sx={{ 
                color: theme.palette.primary.main,
                '&:hover': { transform: 'translateY(-3px)' }
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton 
              sx={{ 
                color: theme.palette.primary.main,
                '&:hover': { transform: 'translateY(-3px)' }
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton 
              sx={{ 
                color: theme.palette.primary.main,
                '&:hover': { transform: 'translateY(-3px)' }
              }}
            >
              <FacebookIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>

      {/* Success Message */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            bgcolor: 'rgba(78,205,196,0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          Thank you for your submission! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact; 