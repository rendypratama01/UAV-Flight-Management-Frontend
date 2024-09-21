import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import logo from "../assets/img/logo.png";
import { dashboardPath } from "../routes";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(formData.email, formData.password);
      console.log("Login Response:", data); // Display the entire login response in the console
      navigate(dashboardPath);
    } catch (error) {
      // Assuming error response structure is { msg: 'Wrong Password' }
      setError(error.response?.data?.msg || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Card Container */}
      <div className="bg-white shadow-2xl rounded-2xl flex w-3/4 max-w-4xl transform hover:scale-105 transition-transform duration-500 ease-in-out">
        {/* Image Section */}
        <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-gray-300 to-blue-300 rounded-l-2xl">
          <img
            src={logo}
            alt="Login Logo"
            className="w-2/3 h-auto transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Form Section */}
        <div className="w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Selamat Datang
              </h2>
              <p className="text-gray-500">Silahkah Login</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6 mt-3 relative">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div
                  className="absolute right-4 top-10 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility} // Toggle icon and input type on click
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={24} />
                  ) : (
                    <AiFillEye size={24} />
                  )}
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="mt-4 flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
