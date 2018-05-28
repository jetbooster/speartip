#!/usr/bin/env node
const express = require("express");
const path = require("path");
const https = require('https');
const fs = require('fs');
const proxy = require("express-http-proxy");
const config = require("./server.config.js");

const app = express();

app.use("/", express.static(path.join(__dirname, "dist")));
app.use("/api", proxy(`${config.api.hostname}:${config.api.port}`));

const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/speartipsolutions.co.uk/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/speartipsolutions.co.uk/privkey.pem'),
}

express().get('*', (req,res)=>{
  res.redirect(`https://${req.headers.host}${req.url}`)
}).listen(80);
https.createServer(options,app).listen(443)
