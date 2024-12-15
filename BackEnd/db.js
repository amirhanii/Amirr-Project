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
        createCartTable,
        createOrdersTable,
    };
