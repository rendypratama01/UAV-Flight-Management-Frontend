import axios from 'axios';

// Ensure the API URL is defined
const API_URL = process.env.REACT_APP_UAV_API_URL;

if (!API_URL) {
  console.error('UAV API URL is not defined. Please set UAV_API_URL in your .env file.');
}

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Fetch all data
const getAllData = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/data', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching all data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch data by category
const getDataByCategory = async (category) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/data-category', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        category, // Pass the category as a query parameter
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data by category:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch data activity by year
const getDataActivity = async (tahun) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/data-activity', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        tahun, // Pass the year as a query parameter
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data activity:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch data resource by year
const getDataResource = async (tahun) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/data-resource', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        tahun, // Pass the year as a query parameter
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data resource:', error.response ? error.response.data : error.message);
    throw error;
  }
};


const getWeatherData = async (lat, lon) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get('/weather', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        lat, 
        lon, 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const totalDataService = {
  getAllData,
  getDataByCategory,
  getDataActivity,   
  getDataResource,   
  getWeatherData,    
};

export default totalDataService;
