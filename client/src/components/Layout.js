import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout; 