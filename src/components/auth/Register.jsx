import React, { useState } from 'react';
import { registerUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    shippingAddress: '',
    email: '',
    birthDate: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      // Muestra el mensaje del backend en una alerta
      alert(response);
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro', error);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: '2rem', 
          width: '100%', 
          borderRadius: '8px', 
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Registro de Usuario
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Completa el formulario para crear tu cuenta
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Nombres" 
            name="firstName"
            variant="outlined"
            fullWidth 
            margin="normal" 
            onChange={handleChange}
          />
          <TextField 
            label="Apellidos" 
            name="lastName"
            variant="outlined"
            fullWidth 
            margin="normal" 
            onChange={handleChange}
          />
          <TextField 
            label="Dirección de envío" 
            name="shippingAddress"
            variant="outlined"
            fullWidth 
            margin="normal" 
            onChange={handleChange}
          />
          <TextField 
            label="Correo electrónico" 
            name="email"
            variant="outlined"
            fullWidth 
            margin="normal" 
            onChange={handleChange}
          />
          <TextField 
            label="Fecha de nacimiento" 
            name="birthDate"
            type="date"
            variant="outlined"
            fullWidth 
            margin="normal" 
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
          <TextField 
            label="Contraseña" 
            name="password"
            type="password"
            variant="outlined"
            fullWidth 
            margin="normal" 
            onChange={handleChange}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            fullWidth 
            sx={{ mt: 2, py: 1.5 }}
          >
            Registrarse
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
