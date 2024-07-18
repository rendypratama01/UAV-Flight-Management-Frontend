import React, { useState } from 'react';
import { dashboardPath } from '../routes';
import logo from "../assets/img/logo.png";

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted: ', formData);
    // Handle form submission logic here, e.g., send data to backend
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
              <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="email"
                className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={formData.username}
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
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <a href={dashboardPath} className="no-underline hover:no-underline text-inherit">
                  Login
                </a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
