import React from 'react';
import './cart.css';

const Cart = ({ cartItems, goBack, removeFromCart, proceedToCheckout }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.productId} className="cart-item"> {/* Use productId as the key */}
                <img src={item.image} alt={item.name} className="cart-image" />
                <div>
                  <strong>{item.name}</strong> x {item.quantity}
                </div>
                <div>${(item.price * item.quantity).toFixed(2)}</div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-cart-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={proceedToCheckout} className="proceed-checkout-button">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
