import React from 'react';
import './brand.css';

const BrandA = ({ goBack, addToCart }) => {
  const products = [
    { id: 1, name: 'Puffer Jacket', price: 20, image: 'https://www.gliks.com/cdn/shop/files/TheNorthFace-Aconcagua-Jacket-Men-Black-1_1400x1400.jpg' },
    { id: 2, name: 'Quarter Zip', price: 30, image: 'https://mosaic04.ztat.net/prd/media/comet/TH342G0A0-Q11/PREVIEW_IMG/0002NR0WH8G_image_1718865624.jpg' },
  ];

  return (
    <div className="brand-page">
      <h1>Brand A</h1>
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

export default BrandA;
