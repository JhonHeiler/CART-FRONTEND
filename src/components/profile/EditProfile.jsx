import React, { useState, useEffect, useContext } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../../services/userService';

const EditProfile = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    shippingAddress: '',
    email: '',
    birthDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Carga los datos actuales del perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          shippingAddress: data.shippingAddress || '',
          email: data.email || '',
          birthDate: data.birthDate || ''
        });
      } catch (err) {
        setError('Error al cargar el perfil.');
        console.error('Error obteniendo perfil', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      alert('Perfil actualizado con éxito.');
      navigate('/perfil');
    } catch (err) {
      console.error('Error al actualizar perfil', err);
      setError('Error al actualizar perfil.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography>Cargando...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          backgroundColor: '#ffffff', 
          boxShadow: '0px 4px 20px rgba(0,0,0,0.1)' 
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Editar Perfil
        </Typography>
        {error && (
          <Typography variant="body1" color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombres"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Apellidos"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dirección"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo Electrónico"
            name="email"
            value={formData.email}
            variant="outlined"
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Fecha de Nacimiento"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" type="submit">
              Guardar Cambios
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/perfil')}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProfile;
