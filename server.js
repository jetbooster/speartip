const express = require("express");
const path = require("path");
const os = require('os')
const proxy = require("express-http-proxy");
const config = require("./server.config.js");

const app = express();
const api = express();

app.use("/", express.static(path.join(__dirname, "dist")));
app.use("/api", proxy(`${config.api.hostname}:${config.api.port}`));


// app.get("/admin", (req,res)=>{
//   const cert = req.connection.getPeerCertificate();
//   console.log(cert)
//   if (req.client.authorized) {
//     res.send(`Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`)
//   } else if (cert.subject) {
// 		res.status(403)
//        .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`);
//   } else {
// 		res.status(401)
// 		   .send(`Sorry, but you need to provide a client certificate to continue.`);
// 	}
// })

console.log(os.homedir())

require('greenlock-express').create({

  // Let's Encrypt v2 is ACME draft 11
  version: 'draft-11'

, server: 'https://acme-v02.api.letsencrypt.org/directory'
  // Note: If at first you don't succeed, switch to staging to debug
  // https://acme-staging-v02.api.letsencrypt.org/directory

  // You MUST change this to a valid email address
, email: 'admin@speartipsolutions.co.uk'

  // You MUST NOT build clients that accept the ToS without asking the user
, agreeTos: true

  // You MUST change these to valid domains
  // NOTE: all domains will validated and listed on the certificate
, approveDomains: [ 'speartipsolutions.co.uk', 'www.speartipsolutions.co.uk' ]

  // You MUST have access to write to directory where certs are saved
  // ex: /home/foouser/acme/etc
, configDir: path.join(os.homedir(), 'acme', 'etc')

, app

  // Join the community to get notified of important updates and help me make greenlock better
, communityMember: false

  // Contribute telemetry data to the project
, telemetry: true

// , debug: true

}).listen(80, 443);
       
// eslint-disable-next-line no-unused-vars
api.post("/*", (req, res, next) => {
  res.data = { "body-key": "body-value" };
  res.sendStatus(200);
});
