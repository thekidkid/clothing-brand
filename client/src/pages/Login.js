import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Divider,
} from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Sign in to your account to continue
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register">
                Sign up
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login; 