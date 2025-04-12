import React, { createContext, useContext, useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success'
  });

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const showNotification = (message, type = 'success') => {
    setNotification({
      open: true,
      message,
      type
    });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(prev => ({ ...prev, open: false }));
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        showNotification(`Increased ${product.name} quantity in cart`);
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showNotification(`${product.name} added to cart`);
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    const product = cartItems.find(item => item.id === productId);
    if (product) {
      showNotification(`${product.name} removed from cart`, 'info');
    }
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prevItems => {
      const isInWishlist = prevItems.some(item => item.id === product.id);
      if (isInWishlist) {
        showNotification(`${product.name} removed from wishlist`, 'info');
        return prevItems.filter(item => item.id !== product.id);
      }
      showNotification(`${product.name} added to wishlist`);
      return [...prevItems, { ...product }];
    });
  };

  const removeFromWishlist = (productId) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      showNotification(`${product.name} removed from wishlist`, 'info');
    }
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    showNotification('Cart cleared', 'info');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      removeFromWishlist,
      clearCart,
      getCartTotal,
      getCartItemsCount
    }}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={2000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.type}
          variant="filled"
          sx={{ 
            backgroundColor: notification.type === 'success' ? '#4ECDC4' : '#FF6B6B',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </CartContext.Provider>
  );
}; 