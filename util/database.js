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