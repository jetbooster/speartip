const express = require("express");
const path = require("path");
const https = require('https');
const fs = require('fs');
const proxy = require("express-http-proxy");
const config = require("./server.config.js");

// screw figuring out webpack to move two files
fs.copyFileSync('./src/resources/manifest.json','./dist/assets/manifest.json')
fs.copyFileSync('./src/resources/speartip.ico','./dist/assets/media/speartip.ico')

const app = express();

app.use("/", express.static(path.join(__dirname, "dist")));
app.use("/api", proxy(`${config.api.hostname}:${config.api.port}`));

const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/speartipsolutions.co.uk/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/speartipsolutions.co.uk/privkey.pem'),
}

express.createServer().get('*', (req,res)=>{
  res.redirect(`https://${req.headers.host}${req.url}`)
}).listen(80);
https.createServer(options,app).listen(443)
