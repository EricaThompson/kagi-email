const net = require("net");
const port = 5197;

const server = net.createServer((socket) => {
    console.log(`server connected`)

    socket.write('hello world');
});


server.listen(port, () => {
    console.log(`server running on port ${port}`)
})