import React from 'react';
import './navbar.css'; // Ensure this file contains the appropriate styles

const Navbar = ({ handleReturnHome, goToCart, handleBrowseServices, isAuthenticated, handleLogout }) => {
  return (
    <nav className="navbar">
      <button onClick={handleReturnHome}>Home</button>
      <button onClick={goToCart}>View Cart</button>
      <button onClick={handleBrowseServices}>Services</button>
      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      {!isAuthenticated && <button onClick={() => window.location.href = '/login'}>Login</button>}
    </nav>
  );
};

export default Navbar;
