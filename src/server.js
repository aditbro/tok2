const http = require('https');
const WebSocket = require('ws');
const fs = require('fs');
const router = require('./routes');
const GameController = require('./games/gameController');

controller = new GameController();

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const server = http.createServer(options, function (req, res) {
  router.routes(req, res);
});
const wss = new WebSocket.Server({ noServer: true });


wss.on('connection', function connection(ws, request) {
  ws.on('message', function message(msg) {
    console.log(`Received message ${msg}`);
    try {
      msg = JSON.parse(msg);
      controller.receiveMessage(ws, msg); 
    } catch(err) {
      console.log(err);
    }
  });
});

server.on('upgrade', function upgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});


server.listen(8080);

module.exports = server;