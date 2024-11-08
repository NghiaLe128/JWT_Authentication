import React, { useState } from "react";
import Button from "../components/ui/Button.js";
import Input from "../components/ui/Input.js";
import Label from "../components/ui/Label.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 3 || username.length > 20) {
      newErrors.username = "Username must be between 3 and 20 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Email must be a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8 || password.length > 20) {
      newErrors.password = "Password must be between 8 and 20 characters";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      // If there are validation errors, show them in a SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Validation Errors',
        html: Object.values(errors).map(err => `<p>${err}</p>`).join(""),
      });
      return;
    }
  
    try {
      const response = await  axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, {
        username,
        email,
        password,
      });
  
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You can now log in.',
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      let errorMessage = "An unknown error occurred.";
      // if (error.response && error.response.data && error.response.data.message) {
      //   errorMessage = error.response.data.message;
      // }
      if (error.response) {
        console.error("Login error:", error.response.data);
        const errorData = error.response.data;
        if (errorData && errorData.message && errorData.message.message) {
          errorMessage = errorData.message.message;
        } else if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } else {
        console.error("Login error:", error.message);
        errorMessage = error.message;
      }
  
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
              onChange={(e) => setUsername(e.target.value)}
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
