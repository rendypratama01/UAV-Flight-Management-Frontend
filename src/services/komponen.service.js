import axios from 'axios';

const API_URL = process.env.REACT_APP_UAV_API_URL;

if (!API_URL) {
  console.error('UAV API URL is not defined. Please set UAV_API_URL in your .env file.');
}

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

const getKomponen = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/components', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching komponen:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getKomponenById = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get(`/components/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching komponen by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const addKomponen = async (formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.post('/components', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error adding komponen:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// New method to update komponen by ID
const updateKomponen = async (uuid, formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.patch(`/components/${uuid}`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating komponen:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// New method to search 
const searchKomponen = async (queryParams) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/search-components', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching komponen:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const deleteKomponen = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.delete(`/components/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting komponen:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const komponenService = {
  getKomponen,
  getKomponenById,
  addKomponen,
  updateKomponen,
  searchKomponen, 
  deleteKomponen,
};

export default komponenService;
