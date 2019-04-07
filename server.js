// .env to store passwords, sql for database, enquirer for CLI user interaction 
const env = require('dotenv').config();
const mysql = require('mysql');
const listenPort = 3001;
const http = require('http');

// All the pertinent information to contact our DB
const sqlDBConnection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT,
    user: 'root',
    password: process.env.SUBLIST_PASS,
    database: 'sublist_sortDB'
});

// Function pulls and displays data;
const pullAllDBData = (request, response) => {
  const query = "SELECT * FROM sublist_sort_items"
  sqlDBConnection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res[0].itemID);
    response.end(JSON.stringify(res));
  });
};

// Begin the connection, and fire a function to load the list of items for sale.
sqlDBConnection.connect((err) => {
    if(err) throw err;
    console.log(`\nConnected to ${process.env.PORT}\n`)
});

const server = http.createServer(pullAllDBData);

server.listen(listenPort, () => {
  console.log(`🌎 ==> API server now on port ${listenPort}!`)
});
