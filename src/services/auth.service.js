import axios from 'axios';

const API_URL = process.env.REACT_APP_UAV_API_URL;

if (!API_URL) {
  console.error('UAV API URL is not defined. Please set REACT_APP_UAV_API_URL in your .env file.');
}

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, { email, password });
    const { accessToken, uuid, id, role } = response.data; // Ambil ID dari response

    // Save the token, UUID, and User ID in both localStorage and sessionStorage
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('userUUID', uuid);
    localStorage.setItem('userID', id); 
    localStorage.setItem('Role', role);

    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const logoutUser = async () => {
  try {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (!authToken) {
      throw new Error('User is not authenticated');
    }

    // Send DELETE request to /logout
    const response = await axios.delete(`${API_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Clear the auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userUUID');
    localStorage.removeItem('userID');
    
    return response.data;
  } catch (error) {
    console.error('Logout error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken') || !!sessionStorage.getItem('authToken');
};

const changePassword = async (oldPassword, newPassword, confirmNewPassword) => {
  try {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (!authToken) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.post(
      `${API_URL}/user/change-password`,
      { oldPassword, newPassword, confirmNewPassword },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Change password error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const authService = {
  login,
  logoutUser,
  isAuthenticated,
  changePassword,
};

export default authService;
