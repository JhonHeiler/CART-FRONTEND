import React, { useEffect, useState } from 'react';
import { listProducts, deleteProduct } from '../../services/productService';
import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Divider,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import defaultImage from '../../assets/mono.png'; // Importa la imagen guardada en assets

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const data = await listProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error('Error al eliminar producto', error);
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Cargando productos...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4">Lista de Productos</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/products/add')}>
            Agregar Producto
          </Button>
        </Box>
        {products.length > 0 ? (
          <List>
            {products.map(product => (
              <React.Fragment key={product.id}>
                <ListItem
                  secondaryAction={
                    <Box>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                        sx={{ mr: 1 }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(product.id)}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={
                        product.imageUrl 
                          ? `${process.env.PUBLIC_URL}/images/${product.imageUrl}` 
                          : defaultImage
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.description}
                    secondary={`Precio: $${product.price}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No hay productos disponibles.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ProductList;
