// utils/auth.js
export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken'); // Adjust based on your authentication logic
  };
  