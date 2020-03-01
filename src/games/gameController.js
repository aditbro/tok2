const BalloonGame = require('./balloon/balloon');

class GameController {
  constructor() {
    this.players = [];
    this.screen;
    this.currentGame;
  }

  receiveMessage(ws, msg) {
    if(msg.action == 'add_screen') {
      this.addScreen(ws);
    } else if(msg.action == 'add_player') {
      this.addPlayer(ws);
    } else if(msg.action == 'game_action') {
      this.controllGame(ws, msg);
    } else if(msg.action == 'start_game') {
      this.assignGame(BalloonGame);
    }
  }

  addScreen(ws) {
    this.screen = { socket: ws }
    let success_response = { message: "screen registered" };
    this.screen.socket.send(JSON.stringify(success_response));
  }

  addPlayer(ws) {
    if(this.players.length >= 3) {
      let response = { message: "player registration rejected" };
      ws.send(JSON.stringify(response));
      return null;
    }

    let player = this.createNewPlayer(ws);

    this.players.push(player);
    let response = {
      message: "player registration accepted",
      id: player.id,
      action: "assign_id"
    }
    player.socket.send(JSON.stringify(response));
  }

  handleGameFinish(score) {
    for(let i = 0; i < this.players.length; i++) {
      this.players[i].score += score[i];
    }
  }

  createNewPlayer(ws) {
    return {
      socket: ws,
      id: this.players.length + 1,
      score: 0
    }
  }

  controllGame(ws, msg) {
    this.currentGame.receiveMessage(ws, msg);
  }

  assignGame(game) {
    this.currentGame = new game(this.players, this.screen, this.handleGameFinish);
  }
}

module.exports = GameController;