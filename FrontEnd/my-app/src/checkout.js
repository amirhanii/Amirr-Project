import React, { useState } from 'react';

const Checkout = ({ cartItems, totalPrice, userId, goBack }) => {
  const [address, Address] = useState('');
  const [phone, Phone] = useState('');

  const PlaceOrder = async () => {
    if (!address || !phone) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:555/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, cartItems, totalPrice, address, phone }),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        goBack(); // Navigate back to home or reset the cart after order
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => Address(e.target.value)}
            placeholder="Enter your address"
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => Phone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
      </form>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      <button onClick={PlaceOrder} className="place-order-button">
        Place Order
      </button>
      <button onClick={goBack} className="back-button">
        Back to Cart
      </button>
    </div>
  );
};

export default Checkout;
