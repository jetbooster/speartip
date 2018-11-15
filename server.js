#!/usr/bin/env node
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const proxy = require('express-http-proxy');

require('dotenv').config();

const config = require('./server.config.js');
const expressStaticGzip = require('express-static-gzip');

let cert;
let key;
try {
  cert = fs.readFileSync(config.https.cert);
  key = fs.readFileSync(config.https.key);
} catch (e) {
  throw Error('Ensure the paths for key and cert are valid and user has correct permissions');
}

try {
  fs.access(path.join(__dirname, 'dist'));
} catch (e) {
  throw Error('dist directory not found, ensure app has been built with \'npm build\'');
}

const app = express();

app.use('/', expressStaticGzip(path.join(__dirname, 'dist')));
app.use('/api', proxy(`${config.api.hostname}:${config.api.port}`));

const options = {
  cert,
  key,
};

express().get('*', (req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
}).listen(4001);
https.createServer(options, app).listen(4002).then(() => {
  console.log('App listening on 4002');
});
