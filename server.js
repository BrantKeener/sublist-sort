// .env to store passwords, sql for database, enquirer for CLI user interaction 
const env = require('dotenv').config();
const mysql = require('mysql');
const listenPort = 3001;
const express = require('express');
const app = express();
const generate = require('./generate');
const length = 500;
let sqlDBConnection;

console.log(generate(length));

// All the pertinent information to contact our DB
if(process.env.JAWSDB_URL) {
  sqlDBConnection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  sqlDBConnection = mysql.createConnection({
      host: 'localhost',
      port: process.env.DB_PORT,
      user: 'root',
      password: process.env.SUBLIST_PASS,
      database: 'sublist_sortDB'
  });
};

// Routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`./public`));

// This will allow us to grab the data from 
app.get('/sublist', (req, res) => {
  const query = "SELECT * FROM sublist_sort_items";
  sqlDBConnection.query(query, (err, response) => {
    if(err) console.log(err);
    res.end(JSON.stringify(response));
  });
});

// // Begin the connection, and fire a function to load the list of items for sale.
sqlDBConnection.connect((err) => {
  if(err) console.log(err);
    console.log(`\nConnected to ${process.env.DB_PORT}\n`)
});

app.listen(process.env.PORT || listenPort, function () {
	console.log(`🌎 ==> API server now on port ${listenPort}!`);
});