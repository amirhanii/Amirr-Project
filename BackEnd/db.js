const sqlite = require('sqlite3');

// Initialize the database
const db = new sqlite.Database('clothing_outlet.db');

// Table creation queries
const createUserTable = `
CREATE TABLE IF NOT EXISTS USERS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT NOT NULL,
    EMAIL TEXT UNIQUE NOT NULL,
    PASSWORD TEXT NOT NULL
);`;

const createBrandTable = `
CREATE TABLE IF NOT EXISTS BRANDS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT NOT NULL,
    DESCRIPTION TEXT
);`;

const createProductTable = `
CREATE TABLE IF NOT EXISTS PRODUCTS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT NOT NULL,
    BRAND_ID INT NOT NULL,
    PRICE REAL NOT NULL,
    QUANTITY INT NOT NULL,
    IMAGE_URL TEXT NOT NULL, 
    FOREIGN KEY (BRAND_ID) REFERENCES BRANDS(ID)
);`;

const createCartTable = `
CREATE TABLE IF NOT EXISTS CART (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    USER_ID INT NOT NULL,
    PRODUCT_ID INT NOT NULL,
    QUANTITY INT NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USERS(ID),
    FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCTS(ID)
);`;

const createOrdersTable = `
CREATE TABLE IF NOT EXISTS ORDERS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    USER_ID INT NOT NULL,
    PRODUCT_ID INT NOT NULL,
    QUANTITY INT NOT NULL,
    TOTAL_PRICE REAL NOT NULL,
    ADDRESS TEXT NOT NULL,
    PHONE TEXT NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USERS(ID),
    FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCTS(ID)
);`;

// Initialize tables
db.serialize(() => {
    db.run(createUserTable, (err) => {
        if (err) console.error('Error creating USERS table:', err);
    });
    db.run(createBrandTable, (err) => {
        if (err) console.error('Error creating BRANDS table:', err);
    });
    db.run(createProductTable, (err) => {
        if (err) console.error('Error creating PRODUCTS table:', err);
    });
    db.run(createCartTable, (err) => {
        if (err) console.error('Error creating CART table:', err);
    });
    db.run(createOrdersTable, (err) => {
        if (err) console.error('Error creating ORDERS table:', err);
    });
});

module.exports = {
    db,
    createUserTable,
    createBrandTable,
    createProductTable,
    createCartTable,
    createOrdersTable,
};
