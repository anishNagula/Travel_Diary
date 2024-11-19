import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Landing from './pages/Landing/Landing';
import Why from './pages/Why.jsx';
import Reviews from './pages/Reviews.jsx';
import Contact from './pages/Contact.jsx';
import MainNavbar from './layouts/Main_Navbar/MainNavbar'; // Import MainNavbar

const App = () => {
  const [user, setUser] = useState(null); // Manage logged-in user state

  // Function to log in the user (you can call this after successful login/signup)
  const handleLogin = (userData) => {
    setUser(userData); // Save the user data in state
  };

  // Function to log out the user
  const handleLogout = () => {
    setUser(null); // Clear the user state
  };

  // Protected route wrapper
  const RequireAuth = ({ children }) => {
    const location = useLocation();
    if (!user) {
      // Redirect to landing if user is not authenticated
      return <Navigate to="/" replace state={{ from: location }} />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/why" element={<Why />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <RequireAuth>
              <MainNavbar onLogout={handleLogout} /> {/* This is correct, you're passing handleLogout */}
              <Home user={user} onLogout={handleLogout} currentUser={user} />
            </RequireAuth>
          }
        />


        <Route
          path="/profile"
          element={
            <RequireAuth>
              <MainNavbar onLogout={handleLogout} /> {/* Pass handleLogout to MainNavbar */}
              <div>Profile Page</div>
            </RequireAuth>
          }
        />

        {/* Fallback for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
