import React, { useState } from 'react';
import './CheckoutPage.css'; 

const Checkout = ({ cartItems, totalPrice, userId, goBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async () => {
    const { name, email, address, phone } = formData;

    if (!name || !email || !address || !phone) {
      alert('Please fill in all the required fields.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:555/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        credentials: 'include',
        body: JSON.stringify({ userId, cartItems, totalPrice, ...formData }),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        goBack(); 
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
      <form className="checkout-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
      </form>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      <button onClick={handlePlaceOrder} className="place-order-button">
        Place Order
      </button>
      <button onClick={goBack} className="back-button">
        Back to Cart
      </button>
    </div>
  );
};

export default Checkout;
