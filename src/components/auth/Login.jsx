import React, { useState, useContext, useEffect } from 'react';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si ya existe un token, redirige automáticamente al perfil
  useEffect(() => {
    if (token) {
      navigate('/perfil');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      // Redirige al perfil inmediatamente
      navigate('/perfil');
    } catch (error) {
      console.error('Error en el login', error);
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
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Bienvenido, ingresa tus credenciales para acceder
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Correo electrónico" 
            variant="outlined"
            fullWidth 
            margin="normal" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            label="Contraseña" 
            type="password" 
            variant="outlined"
            fullWidth 
            margin="normal" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2, py: 1.5 }}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
