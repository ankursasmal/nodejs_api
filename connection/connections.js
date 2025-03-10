const mysql = require('mysql');
require('dotenv').config()
 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'school',
    password: process.env.PASSWORD,
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting in school:', err);
    } else {
        console.log('Connection in school successful');
    }
});

module.exports = connection;
