// src/components/layout/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5', // Color de fondo atractivo y neutro
      }}
    >
      <Header />
      <Box component="main" sx={{ flexGrow: 1, padding: '2rem' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
