// src/components/owner/OwnerLogin.jsx

import React from 'react';
import axios from 'axios'; 
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const OwnerLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("✅ Google user:", user);

    // 🔥 Send user info to your backend
    const { data } = await axios.post('http://localhost:5000/api/owners/google-login', {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      uid: user.uid
    });

    // ✅ Store the JWT token
    localStorage.setItem('token', data.token);

    alert(`Welcome, ${data.user.name}!`);

    // ⏩ Redirect to dashboard
    navigate('/owner/dashboard');
  } catch (error) {
    console.error("❌ Google login failed:", error);
    alert("Google Sign-in failed: " + error.message);
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Owner Login</h2>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default OwnerLogin;
