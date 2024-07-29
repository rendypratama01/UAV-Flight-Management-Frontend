import axios from 'axios';

const API_URL = process.env.REACT_APP_UAV_API_URL;

if (!API_URL) {
  console.error('UAV API URL is not defined. Please set UAV_API_URL in your .env file.');
}

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Fetch all missions
const getMisi = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/missions', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching missions:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch mission by ID
const getMisiById = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get(`/missions/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching mission by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add a new mission
const addMisi = async (formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.post('/missions', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error adding mission:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Update mission by ID
const updateMisi = async (uuid, formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.patch(`/missions/${uuid}`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating mission:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Search missions
const searchMisi = async (queryParams) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/missions/search', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching missions:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete a mission by ID
const deleteMisi = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.delete(`/missions/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting mission:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const misiService = {
  getMisi,
  getMisiById,
  addMisi,
  updateMisi,
  searchMisi,  // Add searchMisi to the service
  deleteMisi,
};

export default misiService;
