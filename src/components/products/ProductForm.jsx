import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, listProducts } from '../../services/productService';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    description: '',
    price: ''
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Si existe, estamos editando

  // Si estamos editando, carga el producto
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const products = await listProducts();
          const product = products.find(p => p.id.toString() === id);
          if (product) {
            setFormData({
              imageUrl: product.imageUrl || '',
              description: product.description || '',
              price: product.price || ''
            });
          }
        } catch (error) {
          console.error('Error al obtener el producto', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, formData);
        alert('Producto actualizado con éxito.');
      } else {
        await addProduct(formData);
        alert('Producto agregado con éxito.');
      }
      navigate('/products');
    } catch (error) {
      console.error('Error al guardar producto', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          {id ? 'Editar Producto' : 'Agregar Producto'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="URL de Imagen"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Precio"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" type="submit">
              {id ? 'Actualizar Producto' : 'Agregar Producto'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/products')}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ProductForm;
