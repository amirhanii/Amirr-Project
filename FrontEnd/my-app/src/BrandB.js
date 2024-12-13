import React from 'react';
import './brand.css';

const BrandB = ({ goBack, addToCart }) => {
  const products = [
    { id: 3, name: 'Product B1', price: 25, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product B2', price: 35, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="brand-page">
      <h1>Brand B</h1>
      
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandB;
