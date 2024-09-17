import axios from 'axios';

const API_URL = process.env.REACT_APP_UAV_API_URL;

if (!API_URL) {
  console.error('UAV API URL is not defined. Please set UAV_API_URL in your .env file.');
}

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

const getFlightById = async (uuid) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.get(`/flight/${uuid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching flight by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const createFlight = async (uuid, formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.patch(`/flight/${uuid}`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating flight:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const updateChecklist = async (uuid, listChecklist) => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No auth token found. Please login.');
    }

    const response = await api.patch(`/flight/checklist/${uuid}`, 
      { listChecklist },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating checklist:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const uploadFlightFile = async (uuid, formData) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No auth token found. Please login.');
      }
  
      const response = await api.post(`/flight-file/${uuid}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error uploading flight file:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  

  const downloadFlightFile = async (uuid) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No auth token found. Please login.');
      }
  
      const response = await api.get(`/flight-file/download/${uuid}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error downloading flight file:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  

  const deleteFlightFile = async (uuid) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No auth token found. Please login.');
      }
  
      const response = await api.delete(`/flight-file/${uuid}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error deleting flight file:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  const penerbanganMisiService = {
    getFlightById,
    createFlight,
    updateChecklist,
    uploadFlightFile,
    downloadFlightFile,
    deleteFlightFile,   
  };
  
  export default penerbanganMisiService;