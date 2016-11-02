const path = require('path');
const express = require('express');
const webpack = require('webpack');

// Load the configuration
require('../config/app');

const app = express();

app.use('/assets', express.static('dist'));

const generateHtml = require('./html.js');
app.get('/', function(req, res) {
  res.send(generateHtml());
});

const server = app.listen(3333, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Word jumble front end app listening at http://%s:%s', host, port);
});
