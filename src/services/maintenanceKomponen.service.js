import axios from 'axios';

const API_URL = process.env.REACT_APP_UAV_API_URL;

if (!API_URL) {
  console.error('UAV API URL is not defined. Please set UAV_API_URL in your .env file.');
}

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Fetch all component repairs
const getPerbaikanKomponen = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/perbaikan-komponen', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching component repairs:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch component repair by ID
const getPerbaikanKomponenById = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get(`/perbaikan-komponen/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching component repair by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add a new component repair
const addPerbaikanKomponen = async (formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.post('/perbaikan-komponen', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error adding component repair:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Update component repair by ID
const updatePerbaikanKomponen = async (uuid, formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.patch(`/perbaikan-komponen/${uuid}`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating component repair:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Search component repairs
const searchPerbaikanKomponen = async (queryParams) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/search-perbaikanKomponen', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching component repairs:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete a component repair by ID
const deletePerbaikanKomponen = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.delete(`/perbaikan-komponen/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting component repair:', error.response ? error.response.data : error);
    throw error;
  }
};

const perbaikanKomponenService = {
  getPerbaikanKomponen,
  getPerbaikanKomponenById,
  addPerbaikanKomponen,
  updatePerbaikanKomponen,
  searchPerbaikanKomponen,
  deletePerbaikanKomponen,
};

export default perbaikanKomponenService;
