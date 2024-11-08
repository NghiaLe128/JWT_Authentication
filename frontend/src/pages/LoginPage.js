import React, { useState } from "react";
import Button from "../components/ui/Button.js";
import Input from "../components/ui/Input.js";
import Label from "../components/ui/Label.js";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/user/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        const userId = response.data.user_id;
        const userName = response.data.user_name;  
        const userToken = response.data.access_token;
        login(userId, userName, userToken);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome back!',
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/"); // Navigate to home after successful login
      }
    } catch (error) {
      let errorMessage = "An unknown error occurred.";
  
      if (error.response) {
        console.error("Login error:", error.response.data);
        const errorData = error.response.data;
        errorMessage = errorData.message || errorMessage;
      } else {
        console.error("Login error:", error.message);
        errorMessage = error.message;
      }
  
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url('background.jpg')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 opacity-60"></div>
      <div className="relative z-10 p-8 bg-white bg-opacity-95 shadow-2xl rounded-3xl max-w-md w-full space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4 pb-3">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label text="Email or Username" htmlFor="usernameOrEmail" isRequired={true} />
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Label text="Password" htmlFor="password" isRequired={true} />
            <span
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <Button type="submit" text="Sign In" className="mt-4" />
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
