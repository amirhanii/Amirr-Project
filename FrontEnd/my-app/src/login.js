import React, { useState } from 'react';
import './login.css'; // CSS for styling the login page

const Login = ({ toggleAuthPage, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState(''); // Track error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state during login
    setErrorMessage(''); // Clear any previous error messages

    try {
      const response = await fetch('http://localhost:555/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Welcome, ${result.name}!`);
        if (onLoginSuccess) onLoginSuccess(result.name); // Notify parent of successful login
      } else {
        setErrorMessage(result.error || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          className="redirect-button"
          onClick={toggleAuthPage}
        >
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
