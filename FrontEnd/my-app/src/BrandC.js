import React from 'react';
import './brand.css';

const BrandC = ({ addToCart }) => {
  const products = [
    { productId: 5, name: 'New Balance 530', price: 30, image: 'https://nb.scene7.com/is/image/NB/mr530sg_nb_02_i?$pdpflexf2$&wid=440&hei=440' },
    { productId: 6, name: 'New Balance Hoodie', price: 40, image: 'https://www.dtlr.com/cdn/shop/products/MT33905_20AG_1200x1200.jpg?v=1699896050' },
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
