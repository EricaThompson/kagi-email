const http = require('http');
const port = 5197;
const emails = require('./data/dummyEmails');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.includes('/emails') ){

    res.writeHead(200);
    res.end(JSON.stringify(emails))
  }
})

server.listen(port, () => {
  console.log(`backend api @ http://localhost:${port}`);
})