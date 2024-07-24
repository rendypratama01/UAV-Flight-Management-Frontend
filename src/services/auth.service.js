// services/auth.service.js

import axios from 'axios';

const API_URL = 'https://api-uav-flight-management-6upxr.ondigitalocean.app/login';

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });
    localStorage.setItem('authToken', response.data.accessToken);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('authToken');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

const authService = {
  login,
  logout,
  isAuthenticated,
};

export default authService;
