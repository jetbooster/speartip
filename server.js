const express = require("express");
const path = require("path");
const https = require('https')
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
       
// eslint-disable-next-line no-unused-vars
api.post("/*", (req, res, next) => {
  res.data = { "body-key": "body-value" };
  res.sendStatus(200);
});

// https.createServer(opts,app).listen(9999)
api.listen(config.client.port, () => console.log(`Api listening on ${config.client.hostname}:${config.client.port}`));
api.listen(config.api.port, () => console.log(`Api listening on ${config.api.hostname}:${config.api.port}`));
