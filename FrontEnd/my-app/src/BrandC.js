import React from 'react';
import './brand.css';

const BrandC = ({ goBack, addToCart }) => {
  const products = [
    { productId: 5, name: 'Product C1', price: 30, image: 'https://via.placeholder.com/150' },
    { productId: 6, name: 'Product C2', price: 40, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="brand-page">
      <h1>Brand C</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.productId} className="product-card">
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

export default BrandC;
