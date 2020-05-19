class BalloonGame {
  constructor(players, screen, endCallback){
    this.players = players;
    this.screen = screen;
    this.endCallback = endCallback;
    this.playerScore = [];
    this.balloonMaxThreshold = 12;
    this.balloonIncrementVal = 2;
    this.freezeDuration = 1;
    this.initPlayerData();
  }

  initPlayerData() {
    for(let i = 0; i < this.players.length; i++){
      this.playerScore.push({
        balloonState: 0,
        balloonScore: 0,
        characterState: 0,
        freezeUntil: 0
      });
    };
  }

  receiveMessage(ws, msg) {
    switch(msg.action_type) {
      case 'pump':
        this.playerPumpEvent(msg);
        break;
      case 'pumpUp':
        this.playerPumpUpEvent(msg);
        break;
    }
  }

  playerPumpUpEvent(msg) {
    let id = msg.id - 1;
    this.playerScore[id].characterState = 0;
    this.updateScreenState();
  }

  playerPumpEvent(msg) {
    let id = msg.id - 1;
    let currTimestamp = new Date() / 1000;

    if(currTimestamp >= this.playerScore[id].freezeUntil) {
      this.playerScore[id].balloonState += this.balloonIncrementVal;
    }

    if(this.playerScore[id].balloonState <= this.balloonMaxThreshold) {
      this.playerScore[id].characterState = 1;
    } else {
      this.playerScore[id].characterState = 3;
      this.playerScore[id].balloonState = 0;
      this.playerScore[id].freezeUntil = currTimestamp + this.freezeDuration;
    }

    this.updateScreenState();
  }

  updateScreenState() {
    let msgToScreen = {
      action: 'game_action',
      players: []
    }
    for(let i = 0; i < this.players.length; i++) {
      msgToScreen.players.push({
        id: i + 1,
        ...this.playerScore[i],
        score: this.players[i].score,
        freezeDuration: this.freezeDuration
      });
    }

    this.screen.socket.send(JSON.stringify(msgToScreen));
  }
}

module.exports = BalloonGame;