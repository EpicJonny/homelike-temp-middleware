const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
// const sensor = require('node-dht-sensor');
require('dotenv').config();

// Express
const app = express();
const port = 3000;
app.use( bodyParser.json() );       // to support JSON-encoded bodies

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

const validate = (req, res, next) => {
  if (req.body.hasOwnProperty('timestamp') &&
    req.body.hasOwnProperty('indoorTemp') && req.body.hasOwnProperty('indoorHumidity') &&
    req.body.hasOwnProperty('outdoorTemp') && req.body.hasOwnProperty('outdoorHumidity')) {
    next();
  } else {
    return res.status(400).send({
      message: 'Bad request'
    });
  }
};

app.get('/', authenticate, (req, res) => {
  res.send({ message: 'Hello' });
});

app.post('/weather', authenticate, validate, async (req, res) => {
  res.send({ message: "Hello" });
});

app.get('*', function(req, res) {
  return res.status(400).send({
    message: 'Bad request'
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});