
const http = require('http');
const router = require('./router');

const port = process.env.PORT || 4444;

const server = http.createServer(router);

server.listen(port);
