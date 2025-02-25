import React, { useState, useEffect } from 'react';
import { 
  getCart, 
  addItemToCart, 
  removeItemFromCart, 
  checkoutCart 
} from '../../services/cartService';
import { listProducts } from '../../services/productService';
import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ productId: '', quantity: 1 });
  const [message, setMessage] = useState('');
  
  // Lista de productos disponibles para mostrar en el <Select>
  const [products, setProducts] = useState([]);

  // Cargar el carrito
  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error('Error al obtener el carrito', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar la lista de productos
  const fetchAllProducts = async () => {
    try {
      const data = await listProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    }
  };

  useEffect(() => {
    // Al montar, cargamos tanto el carrito como la lista de productos
    fetchCart();
    fetchAllProducts();
  }, []);

  // Agregar ítem al carrito
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const updatedCart = await addItemToCart(newItem);
      setCart(updatedCart);
      setMessage('Producto agregado al carrito');
      // Resetear los campos
      setNewItem({ productId: '', quantity: 1 });
    } catch (error) {
      console.error('Error al agregar ítem', error);
      setMessage('Error al agregar ítem');
    }
  };

  // Eliminar ítem del carrito
  const handleRemoveItem = async (itemId) => {
    if (window.confirm('¿Estás seguro de eliminar este ítem?')) {
      try {
        const updatedCart = await removeItemFromCart(itemId);
        setCart(updatedCart);
        setMessage('Ítem eliminado');
      } catch (error) {
        console.error('Error al eliminar ítem', error);
        setMessage('Error al eliminar ítem');
      }
    }
  };

  // Checkout
  const handleCheckout = async () => {
    try {
      await checkoutCart();
      setMessage('Orden generada con éxito');
      // Recargar el carrito (se vacía al hacer checkout, según tu lógica de backend)
      fetchCart();
    } catch (error) {
      console.error('Error en checkout', error);
      setMessage('Error al procesar checkout');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Cargando carrito...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Mi Carrito</Typography>
        {message && (
          <Typography variant="body1" color="primary" sx={{ mb: 2 }}>
            {message}
          </Typography>
        )}
        
        {/* Lista de ítems del carrito */}
        {cart && cart.items && cart.items.length > 0 ? (
          <List>
            {cart.items.map(item => (
              <React.Fragment key={item.id}>
                <ListItem
                  secondaryAction={
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Eliminar
                    </Button>
                  }
                >
                  <ListItemText
                    primary={`Producto ID: ${item.productId}`}
                    secondary={`Cantidad: ${item.quantity}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Typography variant="h6">
                Total de ítems: {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
              </Typography>
            </Box>
          </List>
        ) : (
          <Typography variant="body1">El carrito está vacío</Typography>
        )}

        {/* Formulario para agregar ítem al carrito */}
        <Box
          component="form"
          onSubmit={handleAddItem}
          sx={{ mt: 4, display: 'flex', gap: 2, alignItems: 'center' }}
        >
          {/* Select de productos */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="product-select-label">Producto</InputLabel>
            <Select
              labelId="product-select-label"
              label="Producto"
              value={newItem.productId}
              onChange={(e) => setNewItem({ ...newItem, productId: e.target.value })}
              required
            >
              <MenuItem value="">
                <em>Selecciona un producto</em>
              </MenuItem>
              {products.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Campo para la cantidad */}
          <TextField
            label="Cantidad"
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            required
            inputProps={{ min: 1 }}
          />

          <Button variant="contained" type="submit">Agregar Ítem</Button>
        </Box>

        {/* Botón para checkout */}
        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Button variant="contained" color="success" onClick={handleCheckout}>
            Checkout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Cart;
