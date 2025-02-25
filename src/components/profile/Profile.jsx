import React, { useEffect, useState, useContext } from 'react';
import { getUserProfile } from '../../services/userService';
import { Container, Typography, Button, Paper, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setProfile(data);
      } catch (error) {
        console.error('Error obteniendo perfil', error);
      }
    };
    fetchProfile();
  }, [token]);

  if (!profile) return <Typography align="center">Cargando...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          backgroundColor: '#ffffff', 
          textAlign: 'center',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Avatar 
          sx={{ width: 80, height: 80, margin: '0 auto', mb: 2 }}
          src="/static/images/avatar/1.jpg" // Puedes actualizar esta URL si tienes una imagen de perfil
        >
          {profile.firstName.charAt(0)}
        </Avatar>
        <Typography variant="h4" gutterBottom>
          {profile.firstName} {profile.lastName}
        </Typography>
        <Box sx={{ mt: 2, textAlign: 'left' }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Correo:</strong> {profile.email}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Dirección:</strong> {profile.shippingAddress}
          </Typography>
          <Typography variant="body1">
            <strong>Fecha de Nacimiento:</strong> {profile.birthDate}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/perfil/editar')}
          sx={{ mt: 3 }}
        >
          Editar Perfil
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
