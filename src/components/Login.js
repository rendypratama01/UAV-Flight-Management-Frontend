import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import logo from "../assets/img/logo.png";
import { dashboardPath } from '../routes';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(formData.email, formData.password);
      console.log('Login Response:', data); // Display the entire login response in the console
      navigate(dashboardPath);
    } catch (error) {
      // Assuming error response structure is { msg: 'Wrong Password' }
      setError(error.response?.data?.msg || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Image Section */}
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <img src={logo} alt="Login" className="w-3/4 h-auto" />
      </div>

      {/* Form Section */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-800">Login</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
