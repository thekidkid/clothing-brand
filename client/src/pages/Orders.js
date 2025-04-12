import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Orders = () => {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Orders
        </Typography>
        <Typography variant="body1">
          Your order history will appear here.
        </Typography>
      </Box>
    </Container>
  );
};

export default Orders; 