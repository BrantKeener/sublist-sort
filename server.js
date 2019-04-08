// .env to store passwords, sql for database, enquirer for CLI user interaction 
const env = require('dotenv').config();
const mysql = require('mysql');
const listenPort = 3001;
const express = require('express');
const app = express();

// All the pertinent information to contact our DB
const sqlDBConnection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT,
    user: 'root',
    password: process.env.SUBLIST_PASS,
    database: 'sublist_sortDB'
});

// Routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`./public`));

app.get('/sublist', (req, res) => {
  const query = "SELECT * FROM sublist_sort_items";
  sqlDBConnection.query(query, (err, response) => {
    if(err) res.end(err);
    res.end(JSON.stringify(response));
  });
});

// // Begin the connection, and fire a function to load the list of items for sale.
sqlDBConnection.connect((err) => {
  if(err) res.end(err);
    console.log(`\nConnected to ${process.env.PORT}\n`)
});

app.listen(listenPort, function () {
	console.log(`🌎 ==> API server now on port ${listenPort}!`);
});

