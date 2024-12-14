import React, { useState } from 'react';
import Login from './login';
import SignUp from './signup';
import HomePage from './homepage';
import BrandA from './BrandA';
import BrandB from './BrandB';
import BrandC from './BrandC';
import Cart from './cart';
import Checkout from './CheckoutPage'; // Import CheckoutPage

function App() {
  const [page, setPage] = useState('login'); // Default to login page
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [cartItems, setCartItems] = useState([]); // Track items in the cart

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setPage('home'); // Navigate to home after login
  };

  const addToCart = (productId) => {
    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === productId.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  const goToCart = () => {
    setPage('cart');
  };

  const goToHome = () => {
    setPage('home');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const proceedToCheckout = () => {
    setPage('checkout'); // Navigate to checkout page
  };

  return (
    <div className="App">
      <nav>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={goToCart}>View Cart ({cartItems.length})</button>
        {isAuthenticated && <button onClick={() => setPage('login')}>Logout</button>}
      </nav>

      {page === 'home' && (
        <HomePage navigateTo={setPage} goToCart={goToCart} />
      )}
      {page === 'BrandA' && (
        <BrandA goBack={goToHome} addToCart={addToCart} />
      )}
      {page === 'BrandB' && (
        <BrandB goBack={goToHome} addToCart={addToCart} />
      )}
      {page === 'BrandC' && (
        <BrandC goBack={goToHome} addToCart={addToCart} />
      )}
      {page === 'cart' && (
        <Cart
          cartItems={cartItems}
          goBack={goToHome}
          removeFromCart={removeFromCart}
          userId={1} // Replace with actual logged-in user ID
          clearCart={clearCart}
          proceedToCheckout={proceedToCheckout}
        />
      )}
      {page === 'checkout' && (
        <Checkout
          cartItems={cartItems}
          totalPrice={cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          userId={1} // Replace with actual logged-in user ID
          goBack={goToCart}
        />
      )}
      {page === 'login' && <Login toggleAuthPage={() => setPage('signup')} onLoginSuccess={handleLoginSuccess} />}
      {page === 'signup' && <SignUp toggleAuthPage={() => setPage('login')} />}
    </div>
  );
}

export default App;
