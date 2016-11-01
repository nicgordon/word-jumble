const path = require('path');
const express = require('express');
const webpack = require('webpack');

const app = express();

app.use('/assets', express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const server = app.listen(3333, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Word jumble front end app listening at http://%s:%s', host, port);
});
