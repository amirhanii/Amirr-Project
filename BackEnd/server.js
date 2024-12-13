const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db_access = require('./db.js'); // Database access module
const db = db_access.db;
const server = express();
const port = 555;

// Middleware
server.use(cors());
server.use(express.json());

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

// Other routes (Add your existing routes here)

// Server Initialization
server.listen(port, () => {
  console.log(`Server started at port ${port}`);
  
});
