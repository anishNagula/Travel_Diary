import React from 'react';
import { Link } from 'react-router-dom'; // Add this line
import styles from './navbar.module.css';
import logo from '../../assets/icons/backpack-stroke-rounded.svg'

const Navbar = () => {
  return (
    <div className={styles.mainContainer}>
      <img src={logo} alt="Logo" />
      <div className={styles.rightsection}>
        <button><Link to="/login" >Login</Link></button>
        <button><Link to="/signup" >Sign Up</Link></button>
      </div>
    </div>
  )
}

export default Navbar;