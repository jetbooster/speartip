const express = require("express");
const path = require("path");
const https = require('https')
const fs = require('fs')
const proxy = require("express-http-proxy");
const config = require("./server.config.js");

const app = express();

app.use("/", express.static(path.join(__dirname, "dist")));
app.use("/api", proxy(`${config.api.hostname}:${config.api.port}`));

const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/speartipsolutions.co.uk/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/speartipsolutions.co.uk/privkey.pem'),
}

// require('greenlock-express').create({

//   // Let's Encrypt v2 is ACME draft 11
//   version: 'draft-11'

// , server: 'https://acme-v02.api.letsencrypt.org/directory'
//   // Note: If at first you don't succeed, switch to staging to debug
//   // https://acme-staging-v02.api.letsencrypt.org/directory

//   // You MUST change this to a valid email address
// , email: 'admin@speartipsolutions.co.uk'

//   // You MUST NOT build clients that accept the ToS without asking the user
// , agreeTos: true

//   // You MUST change these to valid domains
//   // NOTE: all domains will validated and listed on the certificate
// , approveDomains: [ 'speartipsolutions.co.uk', 'www.speartipsolutions.co.uk' ]

//   // You MUST have access to write to directory where certs are saved
//   // ex: /home/foouser/acme/etc
// , configDir: path.join(os.homedir(), 'acme', 'etc')

// // , app

// , app: express().use('/', (req, res) => {

//   res.setHeader('Content-Type', 'text/html; charset=utf-8')
//   res.end('Hello, World!\n\n💚 🔒.js');
// })

//   // Join the community to get notified of important updates and help me make greenlock better
// , communityMember: false

//   // Contribute telemetry data to the project
// , telemetry: true

// // , debug: true

// }).listen(80, 443);

app.listen(80);
https.createServer(options,app).listen(443)
