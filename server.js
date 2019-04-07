// .env to store passwords, sql for database, enquirer for CLI user interaction 
const env = require('dotenv').config();
const mysql = require('mysql');

// All the pertinent information to contact our DB
const sqlDBConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.SUBLIST_PASS,
    database: 'sublist_sortDB'
});

// Begin the connection, and fire a function to load the list of items for sale.
sqlDBConnection.connect((err) => {
    if(err) throw err;
    console.log(`\nConnected on ${port}\n`)
}); 