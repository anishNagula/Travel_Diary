import React, { useState } from 'react';
import { auth } from '../../firebase.js'; // Adjust the path as necessary
import { signOut } from 'firebase/auth';
import styles from './home.module.css';

const Home = () => {

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate('/'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Logout error:', error); // Handle error as needed
    }
  };

  return (
    <div className={styles.mainContainer}>
      <button onClick={handleLogout} className={styles.logout}>
        Logout
      </button>
    </div>
  )
}

export default Home;