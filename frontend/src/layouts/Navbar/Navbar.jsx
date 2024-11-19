import React from 'react';
import { Link } from 'react-router-dom'; // Add this line
import styles from './navbar.module.css';
import logo from '../../assets/icon/backpack-stroke-rounded.svg'

const Navbar = () => {
  return (
    <div className={styles.mainContainer}>
      <Link to="/landing"><img className={styles.logo} src={logo} alt="Logo" /></Link>
      <div className={styles.rightsection}>
        <ul>
          <li><a><Link to="/why">Why Us</Link></a></li>
          <li><a><Link to="/reviews">Reviews</Link></a></li>
          <li><a><Link to="/contact">Contact Us</Link></a></li>
        </ul>
        <button><Link to="/login" >Login</Link></button>
        <button><Link to="/signup" >Sign Up</Link></button>
      </div>
    </div>
  )
}

export default Navbar;