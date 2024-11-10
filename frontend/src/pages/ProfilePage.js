import React, { useEffect, useState } from "react";
import { FaEnvelope, FaCalendarAlt, FaUser, FaLock, FaVenusMars } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProFilePage = () => {
  const { userId, userName, userEmail, userCreatedAt, token, loadProfileData } = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  // If the user is not authenticated, show an alert and redirect to login
  useEffect(() => {
    if (!userId || !token) {
      setShowAlert(true); // Show the alert if the user is not logged in
    }
  }, [userId, token]);

  // Close the alert and redirect to login
  const handleAlertClose = () => {
    setShowAlert(false);
    setTimeout(() => {
      navigate("/login"); // Redirect to the login page after closing the alert
    }, 300); // Small delay for the alert to disappear
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const email = response.data.data.email;
          const password = response.data.data.password;
          const createdAt = response.data.data.createdAt;
          
          loadProfileData(email, password, createdAt);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    if (userId && token) {
      fetchProfileData();
    }
  }, [userId, token, loadProfileData]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 p-6">
      {/* Alert for unauthenticated access */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <p className="text-lg font-semibold text-gray-700">You need to log in to view your profile.</p>
            <div className="mt-4">
              <button
                onClick={handleAlertClose}
                className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Content (if authenticated) */}
      {!showAlert && userId && token && (
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-lg transform transition hover:scale-105 duration-500">
          <div
            className="relative h-36 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fit=crop&w=800&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <img
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Avatar"
              />
            </div>
          </div>

          <div className="mt-16 text-center px-6 pb-6">
            <h2 className="text-3xl font-semibold text-gray-800">{userName}</h2>
            <p className="text-gray-500 text-sm">Software Engineer</p>
          </div>

          <div className="px-6 pb-6">
            {/* Display user information */}
            <div className="flex items-center space-x-3 mb-4 text-gray-700">
              <FaEnvelope className="text-blue-500" />
              <p>Email: <span className="text-gray-600">{userEmail}</span></p>
            </div>
            <div className="flex items-center space-x-3 mb-4 text-gray-700">
              <FaCalendarAlt className="text-blue-500" />
              <p>Member Since: <span className="text-gray-600">{new Date(userCreatedAt).toLocaleDateString()}</span></p>
            </div>

            {/* Display username, password, and gender with icons */}
            <div className="flex items-center space-x-3 mb-4 text-gray-700">
              <FaUser className="text-blue-500" />
              <p>Username: <span className="text-gray-600">{userName}</span></p>
            </div>
            <div className="flex items-center space-x-3 mb-4 text-gray-700">
              <FaLock className="text-blue-500" />
              <p>Password: <span className="text-gray-600">************</span></p> {/* Mask password */}
            </div>
            <div className="flex items-center space-x-3 mb-4 text-gray-700">
              <FaVenusMars className="text-blue-500" />
              <p>Gender: <span className="text-gray-600">Male</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProFilePage;
