// src/services/cartService.js
import axios from 'axios';
import { BASE_URL } from '../config';  // BASE_URL

const API_URL = `${BASE_URL}/cart`; 

export const getCart = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const addItemToCart = async (cartItemDTO) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/items`, cartItemDTO, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const removeItemFromCart = async (itemId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/items/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const checkoutCart = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/checkout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
