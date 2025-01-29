import React from 'react';
import './navbar.css'; // Ensure this file contains the appropriate styles

const Navbar = ({ handleReturnHome, goToCart, handleBrowseServices, isAuthenticated, handleLogout,handleLogin }) => {
  return (
    <nav className="navbar">
      <button onClick={handleReturnHome}>Home</button>
      <button onClick={goToCart}>View Cart</button>
      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      {!isAuthenticated && <button onClick={handleLogin}>Login</button>}
    </nav>
  );
};

export default Navbar;
