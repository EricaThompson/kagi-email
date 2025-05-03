const http = require('http');
const port = 5197;
const emails = require('./data/dummyEmails');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url.includes('/emails')) {
    res.writeHead(200);
    res.end(JSON.stringify(emails));

  } else if (req.method === 'POST' && req.url.includes('/submit')) {
    let body = '';

    req.on('data', (piece) => {
      body += piece;
    });

    req.on('end', () => {
      try {
        const emailData = JSON.parse(body);
        const { 
          subject, 
          to, 
          body: emailBody } = emailData;
        const newEmail = {
          body: emailBody,
          date: new Date().toISOString().split('T')[0],
          id: emails.length + 1,
          sender: "me",
          subject,
          to: "adrian"
        };

        emails.unshift(newEmail);

        res.writeHead(200);
        res.end(JSON.stringify({ message: 'email success', newEmail }));

      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'invalid data' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'not found' }));
  }
});

server.listen(port, () => {
  console.log(`backend server @ http://localhost:${port}`);
});
