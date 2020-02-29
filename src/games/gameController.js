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
    }
  }

  addScreen(ws) {
    this.screen = { socket: ws }
    let success_response = { message: "screen registered" };
    this.screen.socket.send(JSON.stringify(success_response));

    /* TEMPORARY SECTION FOR TESTING */
    if(this.screen) {
      this.assignGame(BalloonGame.BalloonGame);
    }
  }

  addPlayer(ws) {
    if(this.players.length >= 3) {
      response = { message: "player registration rejected" };
      ws.send(JSON.stringify(response));
    }

    let player = this.createNewPlayer(ws);

    this.players.push(player);
    response = {
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

exports.GameController = GameController;