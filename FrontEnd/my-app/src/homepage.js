import React from 'react';
import './homepage.css';

const HomePage = ({ navigateTo }) => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Clothing Outlet</h1>
      <div className="brand-list">
        <div className="brand-card" onClick={() => navigateTo('BrandA')}>
          <img src="https://1000logos.net/wp-content/uploads/2017/05/Symbol-North-Face.jpg" alt="Brand A Logo" className="brand-image" />
          <h2>The North Face</h2>
          <p>Outdoor clothing, footwear, and related equipment.</p>
        </div>
        <div className="brand-card" onClick={() => navigateTo('BrandB')}>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/010/994/232/small_2x/nike-logo-black-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg" alt="Brand B Logo" className="brand-image" />
          <h2>Nike</h2>
          <p>Sports Clothing and Footwear for Athelets.</p>
        </div>
        <div className="brand-card" onClick={() => navigateTo('BrandC')}>
          <img src="https://via.placeholder.com/150" alt="Brand C Logo" className="brand-image" />
          <h2>Brand C</h2>
          <p>Affordable and trendy outfits by Brand C.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;