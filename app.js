const express = require('express');
var sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

// Express
const app = express();
const port = 3000;

// SQLLite
const db = new sqlite3.Database(':memory:');

const authenticate = (req, res, next) => {
  if (req.headers['x-api-key'] === process.env.API_KEY) {
    next();
  } else {
    return res.status(401).send({
      message: 'Unauthorised'
    });
  }
};

app.get('/', authenticate, (req, res) => {
  res.send({ message: 'Hello' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});