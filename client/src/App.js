import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';

// Layout Component
import Layout from './components/Layout';

// Page Components
import Landing from './pages/Landing';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Admin/Dashboard';
import Contact from './pages/Contact';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B6B',
      light: '#ff8e8e',
      dark: '#ff4848',
    },
    secondary: {
      main: '#4ECDC4',
      light: '#71d7d0',
      dark: '#3bb3ac',
    },
    background: {
      default: '#121212',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    h4: {
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(255,107,107,0.2)',
          },
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="about" element={<About />} />
              <Route path="admin" element={<Dashboard />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
