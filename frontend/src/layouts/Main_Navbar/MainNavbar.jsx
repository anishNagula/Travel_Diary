import React, { useState } from 'react';
import { auth } from '../../firebase.js'; // Adjust the path as necessary
import { signOut } from 'firebase/auth';
import './mainnavbar.css'

const MainNavbar = () => {
  
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate('/'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Logout error:', error); // Handle error as needed
    }
  };

  return (
    <div className="nav_main">
      <h3>Travel Diary</h3>
      <button onClick={handleLogout} className="logout">
        Logout
      </button>
    </div>
  )
}

export default MainNavbar;