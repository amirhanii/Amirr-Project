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
      return res.status(500).send('Error retrieving user data.');
    }
    if (!row) {
      return res.status(404).send('User not found');
    }

    bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).send('Error comparing passwords.');
      }
      if (!isMatch) {
        return res.status(401).send('Invalid credentials');
      }

      return res.status(200).send('Login successful');
    });
  });
});

// User Registration Route
server.post('/user/register', (req, res) => {
  const { name, email, password } = req.body;

  db.get('SELECT * FROM USERS WHERE EMAIL = ?', [email], (err, row) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).send('Error checking email.');
    }
    if (row) {
      return res.status(400).send('Email already in use.');
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).send('Error hashing password');
      }

      db.run('INSERT INTO USERS (NAME, EMAIL, PASSWORD) VALUES (?, ?, ?)',
        [name, email, hashedPassword], (err) => {
          if (err) {
            console.error('Error registering user:', err);
            return res.status(500).send('Error registering user.');
          }
          return res.status(200).send('Registration successful');
        });
    });
  });
});

// Place Order Route (checkout)
server.post('/orders/checkout', (req, res) => {
  const { userId, cartItems, totalPrice, name, email, address, phone } = req.body;

  // Validate the data
  if (!userId || !cartItems || !totalPrice || !address || !phone) {
    return res.status(400).send('Missing required fields.');
  }

  // Check if each cartItem has a valid productId
  for (let item of cartItems) {
    if (!item.productId) {
      return res.status(400).send('Product ID is missing in one of the cart items.');
    }
  }

  // Insert each item in the cart into the ORDERS table
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

  // Process each cart item
  Promise.all(cartItems.map((item) => insertOrder(item)))
    .then(() => {
      // Successfully placed order
      res.status(200).send('Order placed successfully!');
    })
    .catch((error) => {
      console.error('Error during order placement:', error);
      res.status(500).send(error);
    });
});

// Server Initialization
server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
