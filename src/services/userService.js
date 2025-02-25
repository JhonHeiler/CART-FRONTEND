import axios from 'axios';
import { BASE_URL } from '../config';  // BASE_URL

const API_URL = `${BASE_URL}/users`;  

export const getUserProfile = async () => {
    const token = localStorage.getItem('token'); 
    console.log('Token enviado:', token);
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/profile`, profileData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
