class BalloonGame {
  constructor(players, screen, endCallback){
    this.players = players;
    this.screen = screen;
    this.endCallback = endCallback;
    this.playerScore = Array(players.length).fill(0);
  }

  receiveMessage(ws, msg) {
    ws.send(JSON.stringify(msg));
  }
}

exports.BalloonGame = BalloonGame;