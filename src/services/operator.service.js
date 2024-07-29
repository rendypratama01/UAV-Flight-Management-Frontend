import axios from 'axios';

const API_URL = process.env.REACT_APP_UAV_API_URL;

if (!API_URL) {
  console.error('UAV API URL is not defined. Please set UAV_API_URL in your .env file.');
}

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Fetch all operators
const getOperator = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching operators:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch operator by ID
const getOperatorById = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get(`/users/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching operator by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add a new operator
const addOperator = async (formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.post('/users', formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error adding operator:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Update operator by ID
const updateOperator = async (uuid, formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.patch(`/users/${uuid}`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating operator:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Search operators
const searchOperator = async (queryParams) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/users/search', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching operators:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete an operator by ID
const deleteOperator = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.delete(`/users/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting operator:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const operatorService = {
  getOperator,
  getOperatorById,
  addOperator,
  updateOperator,
  searchOperator,  // Add searchOperators to the service
  deleteOperator,
};

export default operatorService;
