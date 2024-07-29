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
const getPerbaikan = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/perbaikan', {
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
const getPerbaikanById = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get(`/perbaikan/${uuid}`, {
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
const addPerbaikan = async (formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.post('/perbaikan', formData, {
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
const updatePerbaikan = async (uuid, formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.patch(`/perbaikan/${uuid}`, formData, {
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
const searchPerbaikan = async (queryParams) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/perbaikan/search', {
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
const deletePerbaikan = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.delete(`/perbaikan/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting repair:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const perbaikanService = {
  getPerbaikan,
  getPerbaikanById,
  addPerbaikan,
  updatePerbaikan,
  searchPerbaikan,  // Add searchPerbaikan to the service
  deletePerbaikan,
};

export default perbaikanService;
