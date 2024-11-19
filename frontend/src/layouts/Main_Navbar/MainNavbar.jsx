import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to navigate after logout
import './mainnavbar.css';

const MainNavbar = ({ onLogout }) => {
  console.log(onLogout); // Check what is passed here

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (typeof onLogout === 'function') {
        onLogout();
        navigate('/');
      } else {
        console.error('onLogout is not a function');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="nav_main">
      <h3>Travel Diary</h3>
      <button onClick={handleLogout} className="logout">
        Logout
      </button>
    </div>
  );
};

export default MainNavbar;
