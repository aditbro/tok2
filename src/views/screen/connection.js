import websocket from 'websocket';

const gameServer = "ws://localhost:8080";
const client = new websocket.w3cwebsocket(gameServer, null, "localhost", {type: screen}, null);

client.onopen = function() {
  let msg = {
    role: "screen",
    action: "init_role"
  }
  client.send(JSON.stringify(msg));
}

export default client;