# node.js---mysql-raw-version

# Mysql

### Installation

```bash
npm install --save mysql2
```

### Config

- util/database

```jsx
const mysql = require('mysql2');

/*
* createConnection - single connection
* createPool - multiple connection
* */

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: '123123'
}); //provide information to `config`

module.exports = pool.promise(); //Export Using Promise to allow Asynchronous Task
```

### App.js

```jsx
const db = require('./util/database');
```

### Mysql Workbench

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/581ec816-6ee9-4b11-b3af-129e30cd8c00/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/581ec816-6ee9-4b11-b3af-129e30cd8c00/Untitled.png)

- PK - Primary Key
- NN - Not Null
- UQ - Unique Index
- BN - Binary
- UN - Unsigned (Allow only nonnegative numbers in a column)
- ZF - Zero Fill
- AI - AUTO_INCREMENT
- G - Generated Column

### Product Table Structure

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fb6ab837-3300-4e8d-9d0c-53f9f8e3d713/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fb6ab837-3300-4e8d-9d0c-53f9f8e3d713/Untitled.png)

- id - Int
    - Primary Key
    - Not Null
    - Unique Index
    - Unsigned
    - Auto Increment
- title - VARCHAR(255)
    - Not Null
- price - DOUBLE
    - Not Null
- description - Text
    - Not Null
- ImageUrl - VARCHAR(255)
    - Not Null

### Usage

```jsx
db.execute('SELECT * FROM products')
    .then((result) => {
        console.log(result[0], result[1]);
    })
    .catch((err) => {
        console.log(err);
    });
```

### Controller.js

```jsx
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    /*
    array destructuring - extract : first element, second element of the array
    rows typically represent data we want from mysql
     */
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/'
            })
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product
        .findById(prodId)
        .then(([product]) => {
          res.render('shop/product-detail', {
            product: product[0],
            pageTitle: product.title,
            path: '/products'
          })
        })
        .catch(err =>
            console.log(err)
        );

};
```

**❗️ array destructuring - extract :** 

First element, Second element of the array.
rows typically represent data we want from mysql and it is also array datatype.

### Model.js

```jsx
const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute(
            'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description]
        );
    }

    static deleteById(id) {

    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(id) {
        return db.execute(
            'SELECT * FROM products WHERE products.id = ?',
            [id]
        );
    }
};
```
