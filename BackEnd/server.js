const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db_access = require('./db.js'); // Import the database module
const db = db_access.db;
const server = express();
const port = 555;

// Middleware
server.use(cors());
server.use(express.json()); // Parse JSON request bodies    
server.use(express.static('public')); // Serve static files

// User Login Route
server.post('/user/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM USERS WHERE EMAIL=?', [email], (err, row) => {
    if (err) {
      console.error('Error retrieving user data:', err);
      return res.status(500).json({ error: 'Error retrieving user data.' });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }

    bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Error comparing passwords.' });
      }
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      return res.status(200).json({ name: row.NAME });
    });
  });
});

// User Registration Route
server.post('/user/register', (req, res) => {
  const { name, email, password } = req.body;

  db.get('SELECT * FROM USERS WHERE EMAIL = ?', [email], (err, row) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ error: 'Error checking email.' });
    }
    if (row) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ error: 'Error hashing password' });
      }

      db.run(
        'INSERT INTO USERS (NAME, EMAIL, PASSWORD) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        (err) => {
          if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ error: 'Error registering user.' });
          }
          return res.status(200).json({ message: 'Registration successful' });
        }
      );
    });
  });
});

// Place Order Route (checkout)
server.post('/orders/checkout', (req, res) => {
  const { userId, cartItems, totalPrice, name, email, address, phone } = req.body;

  if (!userId || !cartItems || !totalPrice || !address || !phone) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  for (let item of cartItems) {
    if (!item.productId) {
      return res.status(400).json({ error: 'Product ID is missing in one of the cart items.' });
    }
  }

  const insertOrder = (cartItem) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO ORDERS (USER_ID, PRODUCT_ID, QUANTITY, TOTAL_PRICE, ADDRESS, PHONE) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, cartItem.productId, cartItem.quantity, totalPrice, address, phone],
        function (err) {
          if (err) {
            console.error('Error inserting order:', err);
            reject('Failed to insert order');
          } else {
            resolve();
          }
        }
      );
    });
  };

  Promise.all(cartItems.map((item) => insertOrder(item)))
    .then(() => {
      res.status(200).json({ message: 'Order placed successfully!' });
    })
    .catch((error) => {
      console.error('Error during order placement:', error);
      res.status(500).json({ error });
    });
});

// Server Initialization
server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
