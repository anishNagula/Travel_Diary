import React, { useEffect, useRef } from 'react';
import styles from './landing.module.css';
import Navbar from '../../layouts/Navbar/Navbar';
import profile from '../../assets/anish.jpg';

const Landing = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const left = leftRef.current;
      const right = rightRef.current;
      const windowHeight = window.innerHeight;

      // For left and right sections (innerLeft, innerRight)
      if (left && right) {
        const leftTop = left.getBoundingClientRect().top;
        const rightTop = right.getBoundingClientRect().top;

        if (leftTop < windowHeight - 100) {
          left.classList.add(styles.visible); // Add visible class to animate
        }
        if (rightTop < windowHeight - 100) {
          right.classList.add(styles.visible); // Add visible class to animate
        }
      }

      // For the cards
      cardsRef.current.forEach((card) => {
        if (card) {
          const cardTop = card.getBoundingClientRect().top;
          if (cardTop < windowHeight - 100) {
            card.classList.add(styles.visible); // Add visible class to animate
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.section1}>
          <h1>Travel</h1>
          <h3>The one place for all you’re journey stories</h3>
          <hr />
          <h1>Diary</h1>
        </div>
        <hr />
        <div className={styles.section2}>
          <h2>Why Use Travel Diary?</h2>
          <div ref={leftRef} className={styles.innerLeft}>
            <h3>Share Your Journey</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum vitae lacus et tempus. Sed fringilla blandit nulla, et euismod urna accumsan id. Aenean nisi elit, pretium ac pellentesque in, interdum at urna. Nulla quam massa, accumsan ut nunc vel, commodo cursus diam. Praesent dictum nec risus at pulvinar. </p>
          </div>
          <div ref={rightRef} className={styles.innerRight}>
            <h3>Engage with Travelers</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum vitae lacus et tempus. Sed fringilla blandit nulla, et euismod urna accumsan id. Aenean nisi elit, pretium ac pellentesque in, interdum at urna. Nulla quam massa, accumsan ut nunc vel, commodo cursus diam. Praesent dictum nec risus at pulvinar. </p>
          </div>
        </div>
        <hr />
        <div className={styles.section3}>
          <h2>See What Our Travelers Are Saying</h2>
          <div className={styles.inner_sec3}>
            {[0, 1, 2, 3].map((_, index) => (
              <div
                key={index}
                className={styles.card}
                ref={(el) => (cardsRef.current[index] = el)} // Store card ref
              >
                <img src={profile} alt="profile" />
                <h3>Anish Nagula</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque tempora placeat perferendis nulla veniam aliquam consequuntur animi beatae culpa laboriosam voluptate eveniet in, magnam aperiam possimus delectus quos modi. Sint!</p>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className={styles.footer}>
          <h4>Created-By: </h4>
          <ul>
            <li>{`~>`} Nagula Anish</li>
            <li>{`~>`} Naman Nagar</li>
            <li>{`~>`} Nidhi N</li>
          </ul>
          <h4>contact us at: 7075773848</h4>
        </div>
      </div>
    </div>
  );
};

export default Landing;
