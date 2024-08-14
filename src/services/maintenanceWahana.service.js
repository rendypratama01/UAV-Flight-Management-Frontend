import axios from 'axios';

const API_URL = process.env.REACT_APP_UAV_API_URL;

if (!API_URL) {
  console.error('UAV API URL is not defined. Please set UAV_API_URL in your .env file.');
}

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Fetch all repairs
const getPerbaikanWahana = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/perbaikan-wahana', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching repairs:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch repair by ID
const getPerbaikanWahanaById = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get(`/perbaikan-wahana/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching repair by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add a new repair
const addPerbaikanWahana = async (formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.post('/perbaikan-wahana', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error adding repair:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Update repair by ID
const updatePerbaikanWahana = async (uuid, formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.patch(`/perbaikan-wahana/${uuid}`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating repair:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Search repairs
const searchPerbaikanWahana = async (queryParams) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/search-perbaikanWahana', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching repairs:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete a repair by ID
const deletePerbaikanWahana = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.delete(`/perbaikan-wahana/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting repair:', error.response ? error.response.data : error);
    throw error;
  }
};

const perbaikanWahanaService = {
  getPerbaikanWahana,
  getPerbaikanWahanaById,
  addPerbaikanWahana,
  updatePerbaikanWahana,
  searchPerbaikanWahana,  // Add searchPerbaikan to the service
  deletePerbaikanWahana,
};

export default perbaikanWahanaService;
