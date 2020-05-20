import websocket from 'websocket';

const gameServer = "wss://" + window.location.host;;
const client = new websocket.w3cwebsocket(gameServer, null, null, null);

client.onopen = function() {
  let msg = {
    action: "add_screen"
  }
  client.send(JSON.stringify(msg));
}

export default client;