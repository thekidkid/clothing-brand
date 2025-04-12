const https = require('https');

const pingServer = () => {
  const options = {
    hostname: 'ryne-backend.onrender.com',
    path: '/ping',
    method: 'GET'
  };

  const req = https.request(options, res => {
    console.log(`Ping status: ${res.statusCode}`);
  });

  req.on('error', error => {
    console.error('Ping error:', error);
  });

  req.end();
};

// Ping every 10 minutes
setInterval(pingServer, 10 * 60 * 1000);

// Initial ping
pingServer();

console.log('Pinger service started'); 