// src/components/layout/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1976d2', padding: '1rem', textAlign: 'center' }}>
      <Typography variant="body2" color="white">
        © 2025 Mi Aplicación de Usuarios. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
