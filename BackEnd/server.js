const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db_access = require('./Db.js'); // Your database access module
const db = db_access.db;
const server = express();
const port = 555;

server.use(cors());
server.use(express.json());

// User Registration
server.post('/user/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }
        const query = `INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)`;
        db.run(query, [name, email, hashedPassword], (err) => {
            if (err) {
                return res.status(400).send('Error registering user');
            }
            res.status(200).send('User registered successfully');
        });
    });
});

// User Login
server.post('/user/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM USERS WHERE email = ?`;
    db.get(query, [email], (err, user) => {
        if (err || !user) {
            return res.status(401).send('Invalid email or password');
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).send('Invalid email or password');
            }
            res.status(200).send('Login successful');
        });
    });
});

// Add a Brand
server.post('/brands/add', (req, res) => {
    const { name, description } = req.body;
    const query = `INSERT INTO BRANDS (name, description) VALUES (?, ?)`;
    db.run(query, [name, description], (err) => {
        if (err) {
            return res.status(400).send('Error adding brand');
        }
        res.status(200).send('Brand added successfully');
    });
});

// Get All Brands
server.get('/brands', (req, res) => {
    const query = `SELECT * FROM BRANDS`;
    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).send('Error fetching brands');
        }
        res.json(rows);
    });
});

// Add a Product
server.post('/products/add', (req, res) => {
    const { name, brand_id, price, quantity } = req.body;
    const query = `INSERT INTO PRODUCTS (name, brand_id, price, quantity) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, brand_id, price, quantity], (err) => {
        if (err) {
            return res.status(400).send('Error adding product');
        }
        res.status(200).send('Product added successfully');
    });
});

// Get All Products
server.get('/products', (req, res) => {
    const query = `SELECT PRODUCTS.id, PRODUCTS.name, BRANDS.name AS brand_name, PRODUCTS.price, PRODUCTS.quantity 
                   FROM PRODUCTS 
                   JOIN BRANDS ON PRODUCTS.brand_id = BRANDS.id`;
    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).send('Error fetching products');
        }
        res.json(rows);
    });
});

// Update Product Quantity
server.put('/products/update/:id', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const query = `UPDATE PRODUCTS SET quantity = ? WHERE id = ?`;
    db.run(query, [quantity, id], (err) => {
        if (err) {
            return res.status(400).send('Error updating product quantity');
        }
        res.status(200).send('Product quantity updated successfully');
    });
});

// Delete a Product
server.delete('/products/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM PRODUCTS WHERE id = ?`;
    db.run(query, [id], (err) => {
        if (err) {
            return res.status(400).send('Error deleting product');
        }
        res.status(200).send('Product deleted successfully');
    });
});

// Start Server
server.listen(port, () => {
    console.log(`Server started at port ${port}`);
    db.serialize(() => {
        db.run(db_access.createUserTable, (err) => {
            if (err) console.log("Error creating user table: " + err);
        });
        db.run(db_access.createBrandTable, (err) => {
            if (err) console.log("Error creating brand table: " + err);
        });
        db.run(db_access.createProductTable, (err) => {
            if (err) console.log("Error creating product table: " + err);
        });
    });
});
