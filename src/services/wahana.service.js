import axios from 'axios';

const API_URL = process.env.REACT_APP_UAV_API_URL;

if (!API_URL) {
  console.error('UAV API URL is not defined. Please set UAV_API_URL in your .env file.');
}

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

const getWahana = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/wahana', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching wahana:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getWahanaById = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get(`/wahana/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching wahana by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// New method to update wahana by ID
const updateWahana = async (uuid, formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.patch(`/wahana/${uuid}`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating wahana:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const addWahana = async (formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.post('/wahana', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error adding wahana:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// New method to search wahana
const searchWahana = async (queryParams) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/search-Wahana', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching wahana:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const deleteWahana = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.delete(`/wahana/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting wahana:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const wahanaService = {
  getWahana,
  getWahanaById,
  addWahana,
  updateWahana,
  searchWahana,  // Add searchWahana to the service
  deleteWahana,
};

export default wahanaService;
