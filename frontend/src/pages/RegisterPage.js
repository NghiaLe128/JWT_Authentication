import React, { useState } from "react";
import Button from "../components/ui/Button.js";
import Input from "../components/ui/Input.js";
import Label from "../components/ui/Label.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:4000/user/register', {
            username, email, password, confirmPassword
        });
        
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'You can now log in.',
            }).then(() => navigate("/login"));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An unknown error occurred.';
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
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
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4 pb-3">Register</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <Input
              id="username"
              type="text"
              placeholder=" "
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
            <Label text="Username" htmlFor="username" isRequired={true} />
          </div>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label text="Email" htmlFor="email" isRequired={true} />
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Label text="Password" htmlFor="password" isRequired={true} />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Label text="Confirm Password" htmlFor="confirmPassword" isRequired={true} />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <Button type="submit" text="Register" />
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
