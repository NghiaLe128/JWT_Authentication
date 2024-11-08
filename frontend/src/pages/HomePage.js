import React, { useState } from "react";
import { FaSignOutAlt, FaUser, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { userId, userName, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false); // Close the dropdown after logout
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");  // Navigate to the profile page
    setIsDropdownOpen(false); // Close the dropdown when navigating to profile
  };

  const handleLogin = () => {
    navigate("/login");
    setIsDropdownOpen(false); // Close the dropdown when navigating to login
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 relative"
      style={{ background: "linear-gradient(to bottom right, #4a90e2, #50c9c3, #3a7bd5)" }}
    >
      {/* Avatar with Dropdown */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-bold text-lg hover:scale-110 transition-transform"
            aria-label="Profile"
          >
            {userId ? (
              <FaUser className="text-xl" />
            ) : (
              <span className="text-xl">{userName ? userName[0].toUpperCase() : "G"}</span>
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
              {userId ? (
                <>
                  <button
                    onClick={handleProfile}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FaUser className="mr-2" /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleProfile}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FaUser className="mr-2" /> Profile
                  </button>
                  <button
                    onClick={handleLogin}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FaSignInAlt className="mr-2" /> Login
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <h1 className="text-4xl font-bold text-center text-white">
        Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-800 to-red-900">{userId ? userName : "Guest"}</span>!
      </h1>

      <div className="text-center space-y-2 text-white mt-6">
        <h2 className="text-2xl font-semibold">COURSE PROJECT</h2>
        <p className="text-lg">PROJECT IA04 - JWT Authentication</p>
      </div>

      {/* Conditionally render sensitive information */}
      {userId ? (
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 mt-8">
          <h3 className="text-xl font-semibold text-center">Project Creator</h3>
          <p><strong>Student ID:</strong> 21127116</p>
          <p><strong>Name:</strong> Nguyễn Lê Thanh Nghĩa</p>
          <p><strong>Class:</strong> 21KTPM2 | University of Science, VNU-HCM</p>
          <p><strong>Supervisors:</strong> Nguyễn Huy Khánh (Theory), Mai Anh Tuấn (Practice), Đỗ Nguyên Kha (Practice), Trần Duy Quang (Practice)</p>
        </div>
      ) : (
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 mt-8">
          <h3 className="text-xl font-semibold text-center">Project Creator</h3>
          <div className="text-center text-black mt-6">
            <p className="text-lg">
              Please{" "}
              <button
                onClick={handleLogin}
                className="font-semibold text-orange-600 hover:underline focus:outline-none"
              >
                Log in
              </button>{" "}
              to view additional information.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
