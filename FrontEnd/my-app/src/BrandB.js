import React from 'react';
import './brand.css';

const BrandB = ({ goBack, addToCart }) => {
  const products = [
    { productId: 3, name: 'Running Shoes', price: 75, image: 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/30d7afaa-343b-4439-b65d-bb544c65420e/NIKE+REVOLUTION+7.png' },
    { productId: 4, name: 'AirForce 1', price: 35, image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/05856ac7-0129-4395-bd6e-2fe2669025fb/custom-nike-dunk-low-by-you-su24.png' },
  ];

  return (
    <div className="brand-page">
      <h1>Brand B</h1>
      
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

export default BrandB;
