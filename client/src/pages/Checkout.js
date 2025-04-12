import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  Fade,
} from '@mui/material';

const Checkout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const steps = ['Shipping', 'Payment', 'Review']; // Define steps here

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Mock cart data (replace with actual data later)
  const cartItems = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 29.99,
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <Fade in={isLoaded} timeout={1000}>
      <Box 
        sx={{ 
          minHeight: '100vh',
          display: 'flex', 
          flexDirection: 'column',
          mt: '-64px',
          pt: '64px',
          backgroundColor: '#1A1A1A',
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            width: '100%',
            bgcolor: '#242424',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            mb: 4,
          }}
        >
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
              Checkout
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ flex: 1, mb: 6 }}>
          <Grid container spacing={4}>
            {/* Main Content */}
            <Grid item xs={12} md={8}>
              <Paper 
                sx={{ 
                  bgcolor: '#242424',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <Stepper 
                    activeStep={activeStep} 
                    sx={{ 
                      '& .MuiStepLabel-label': { 
                        color: 'rgba(255,255,255,0.7)',
                        '&.Mui-active': { color: '#00C6FF' },
                      },
                      '& .MuiStepIcon-root': {
                        color: 'rgba(255,255,255,0.3)',
                        '&.Mui-active': { color: '#00C6FF' },
                        '&.Mui-completed': { color: '#92FE9D' },
                      },
                    }}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

                <Box sx={{ p: 4 }}>
                  {activeStep === steps.length ? (
                    // Order confirmation
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                        Thank you for your order!
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        Your order number is #2001539. We have emailed your order confirmation.
                      </Typography>
                    </Box>
                  ) : (
                    // Checkout steps
                    <>
                      {activeStep === 0 && (
                        // Shipping form
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="First Name"
                              value={shippingData.firstName}
                              onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="Last Name"
                              value={shippingData.lastName}
                              onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              label="Email"
                              type="email"
                              value={shippingData.email}
                              onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              label="Address"
                              value={shippingData.address}
                              onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="City"
                              value={shippingData.city}
                              onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="State/Province"
                              value={shippingData.state}
                              onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="ZIP / Postal code"
                              value={shippingData.zipCode}
                              onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="Country"
                              value={shippingData.country}
                              onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                            />
                          </Grid>
                        </Grid>
                      )}

                      {activeStep === 1 && (
                        // Payment form
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              label="Card Number"
                              placeholder="1234 5678 9012 3456"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="Expiry Date"
                              placeholder="MM/YY"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="CVV"
                              placeholder="123"
                            />
                          </Grid>
                        </Grid>
                      )}

                      {activeStep === 2 && (
                        // Order review
                        <Box>
                          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                            Order Summary
                          </Typography>
                          {cartItems.map((item) => (
                            <Box key={item.id} sx={{ mb: 2 }}>
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={7}>
                                  <Typography sx={{ color: 'white' }}>{item.name}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>x{item.quantity}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <Typography sx={{ color: 'white', textAlign: 'right' }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          ))}
                          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>Subtotal</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'white', textAlign: 'right' }}>
                                ${subtotal.toFixed(2)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>Shipping</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ color: 'white', textAlign: 'right' }}>
                                ${shipping.toFixed(2)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="h6" sx={{ color: 'white' }}>Total</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="h6" sx={{ color: 'white', textAlign: 'right' }}>
                                ${total.toFixed(2)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    </>
                  )}
                </Box>

                {activeStep !== steps.length && (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'flex-end', 
                      p: 3,
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      gap: 2,
                    }}
                  >
                    {activeStep !== 0 && (
                      <Button 
                        onClick={handleBack} 
                        variant="outlined"
                        sx={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          color: 'white',
                          '&:hover': {
                            borderColor: 'rgba(255,255,255,0.5)',
                          },
                        }}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        background: 'linear-gradient(90deg, #00C6FF 0%, #92FE9D 100%)',
                        color: '#1A1A1A',
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(90deg, #00B4FF 0%, #83EF8E 100%)',
                        },
                      }}
                    >
                      {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* Order Summary Sidebar */}
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  bgcolor: '#242424',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  position: { md: 'sticky' },
                  top: { md: '84px' },
                }}
              >
                <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    Order Summary
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  {cartItems.map((item) => (
                    <Box key={item.id} sx={{ mb: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={7}>
                          <Typography sx={{ color: 'white' }}>{item.name}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>x{item.quantity}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography sx={{ color: 'white', textAlign: 'right' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>Subtotal</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ color: 'white', textAlign: 'right' }}>
                        ${subtotal.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>Shipping</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ color: 'white', textAlign: 'right' }}>
                        ${shipping.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" sx={{ color: 'white' }}>Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" sx={{ color: 'white', textAlign: 'right' }}>
                        ${total.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fade>
  );
};

export default Checkout; 