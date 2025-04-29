const net = require('net');
const port = 5197;
const emails = require('./data/dummyEmails.js');

const server = net.createServer((socket) => {
  console.log('server connected');
  
  socket.write('* OK IMAP4rev1 service started\r\n');

});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});