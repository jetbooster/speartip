if (!(process.env.FULL_CHAIN_LOCATION && process.env.CERT_KEY_LOCATION)) {
  throw Error('FULL_CHAIN_LOCATION and CERT_KEY_LOCATION must be set.');
}

module.exports = {
  https: {
    cert: process.env.FULL_CHAIN_LOCATION,
    key: process.env.CERT_KEY_LOCATION,
  },
  api: {
    hostname: 'localhost',
    port: 4001,
  },
  client: {
    hostname: 'localhost',
    port: 3000,
  },
};
