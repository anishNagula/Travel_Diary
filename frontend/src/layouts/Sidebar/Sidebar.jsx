import React from 'react';
import styles from './sidebar.module.css';  // Import the CSS module

const Sidebar = () => {
  return (
    <aside className={styles.sidebarLeft}>
      {/* Profile Summary */}
      <div className={styles.profileSummary}>
        <h3>Anish Nagula</h3>
        <p>Computer Science Student</p>
        <p className={styles.profileCollege}>PES University, Bangalore</p>
      </div>
      
    </aside>
  );
};

export default Sidebar;