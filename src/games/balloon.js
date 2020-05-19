class BalloonGame {
  constructor(players, screen, endCallback){
    this.players = players;
    this.screen = screen;
    this.endCallback = endCallback;
    this.playerScore = [];
    this.balloonMaxThreshold = 11;
    this.balloonMinThreshold = 8;
    this.balloonIncrementVal = 2;
    this.freezeDuration = 5;
    this.isTimerUp = false;

    this.initPlayerData();
    this.initCountDown();
  }

  initCountDown() {
    setTimeout(() => {
      this.isTimerUp = true;
    }, 4000);
  }

  initPlayerData() {
    for(let i = 0; i < this.players.length; i++){
      this.playerScore.push({
        balloonState: 0,
        balloonScore: 0,
        characterState: 0,
        freezeUntil: 0,
        popEvent: false
      });
    };
  }

  receiveMessage(ws, msg) {
    if(!this.isTimerUp) return;
    switch(msg.action_type) {
      case 'pump':
        this.playerPumpEvent(msg);
        break;
      case 'pumpUp':
        this.playerPumpUpEvent(msg);
        break;
      case 'pop':
        this.playerPopEvent(msg);
        break;
    }
  }

  playerPopEvent(msg) {
    let id = msg.id - 1;
    console.log('pop event');

    if(this.playerScore[id].balloonState >= this.balloonMinThreshold) {
      this.playerScore[id].balloonState = 0;
      this.playerScore[id].balloonScore += 1;
      this.playerScore[id].popEvent = 1;
      this.updateScreenState();
      this.playerScore[id].popEvent = 0;
    } else {
      this.playerScore[id].balloonState = 0;
      this.playerScore[id].popEvent = 2;
      this.updateScreenState();
      this.playerScore[id].popEvent = 0;
    }
  }

  playerPumpUpEvent(msg) {
    let id = msg.id - 1;
    let currTimestamp = new Date() / 1000;
    if(currTimestamp >= this.playerScore[id].freezeUntil) {
      this.playerScore[id].characterState = 0;
    }
    this.updateScreenState();
  }

  playerPumpEvent(msg) {
    let id = msg.id - 1;
    let currTimestamp = new Date() / 1000;

    if(currTimestamp >= this.playerScore[id].freezeUntil) {
      this.playerScore[id].balloonState += this.balloonIncrementVal;
    } else {
      return;
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