let express = require('express');
let server = express();
let products = require('./products.js'); // Assuming products.js contains the product data

server.use(express.json());

// Get all products or filter by category
server.get('/products', (req, res) => {
    if (req.query.category) {
        let result = products.filter((n) => {
            return n.category.toLowerCase() === req.query.category.toLowerCase();
        });
        if (result.length === 0) {
            return res.status(404).send(`No products found with category: ${req.query.category}`);
        } else {
            res.json(result);
        }
    } else {
        res.json(products);
    }
});

// Get product by ID
server.get('/products/:id', (req, res) => {
    let result = products.find((n) => {
        return n.id == req.params.id;
    });
    if (!result) {
        res.status(404).send(`No product found with id: ${req.params.id}`);
    } else {
        res.json(result);
    }
});

// Add a new product
server.post('/addproduct', (req, res) => {
    let newProduct = {
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
    };
    products.push(newProduct);
    res.status(200).send("New product added");
});

// Update an existing product's price
server.put('/updateproduct/:id', (req, res) => {
    let index = products.findIndex((n) => {
        return n.id == req.params.id;
    });
    if (index === -1) {
        res.status(404).send(`Product with id ${req.params.id} not found`);
    } else {
        products[index].price = req.body.newPrice;
        res.status(200).send("Product updated");
    }
});

// Delete a product by ID
server.delete('/deleteproduct/:id', (req, res) => {
    let newProducts = products.filter((n) => {
        return n.id != req.params.id;
    });
    products = newProducts;
    res.status(200).send("Product deleted");
});

// Start the server
server.listen(8000, () => {
    console.log('Server is up and listening on port 8000');
});
