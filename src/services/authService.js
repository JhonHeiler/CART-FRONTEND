import axios from 'axios';
import { BASE_URL } from '../config';  // BASE_URL

const API_URL = `${BASE_URL}/users`; 

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};
