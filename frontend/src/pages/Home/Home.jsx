import React, { useState } from 'react';
import styles from './home.module.css';
import MainNavbar from '../../layouts/Main_Navbar/MainNavbar.jsx';
import Sidebar from '../../layouts/Sidebar/Sidebar.jsx';

const Home = () => {

  return (
    <div className={styles.mainContainer}>
      <MainNavbar />
      <div className={styles.innerContainer}>
        <Sidebar />
        <div className={styles.right_container}></div>
      </div>
    </div>
  )
}

export default Home;