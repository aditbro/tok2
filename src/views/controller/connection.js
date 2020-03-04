import websocket from 'websocket';

const gameServer = "wss://" + window.location.host;
console.log(gameServer);
const client = new websocket.w3cwebsocket(gameServer, null, null, null);
client.onopen = function () {
  let msg = {
    action: "add_player"
  }
  client.send(JSON.stringify(msg));
}

export default client;