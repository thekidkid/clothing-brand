import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Fade,
} from '@mui/material';
import { motion } from 'framer-motion';

const Landing = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleEnter = () => {
    navigate('/home');
  };

  return (
    <Fade in={isLoaded} timeout={1000}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(0,198,255,0.1) 0%, rgba(26,26,26,0) 70%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '4rem', md: '8rem' },
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: 900,
                  letterSpacing: '0.2em',
                  background: 'linear-gradient(45deg, #00C6FF, #92FE9D)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(0,198,255,0.3)',
                  mb: 4,
                }}
              >
                RYNE
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  color: 'rgba(255,255,255,0.7)',
                  mb: 6,
                  letterSpacing: '0.1em',
                }}
              >
                PREMIUM STREETWEAR REDEFINED
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <Button
                onClick={handleEnter}
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#00C6FF',
                  color: '#00C6FF',
                  fontSize: '1.2rem',
                  padding: '15px 40px',
                  letterSpacing: '0.2em',
                  '&:hover': {
                    borderColor: '#92FE9D',
                    background: 'linear-gradient(45deg, rgba(0,198,255,0.1), rgba(146,254,157,0.1))',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                ENTER SHOP
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};

export default Landing; 