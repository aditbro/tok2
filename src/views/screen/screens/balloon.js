'use strict';
import React from 'react';
import './balloon.css';
import Timer from 'react-compound-timer';

export default class BalloonGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: this.getPlayersNewState(this.props.players)
    };
    this.isCountDownCalled = false;
    this.showTimer = false;
    this.gameTime = 80 * 1000;

    this.comm = this.props.comm;
    this.comm.ongamemessage = (msg) => {
      this.handleMessage(msg);
    };
    this.audio = new Audio('/static/img/Sound/gamebgm.mp3');
    this.audio.loop = true;
  }

  handleMessage(msg) {
    switch(msg.type) {
      case 'player_update':
        let players = msg.players;
        this.updatePlayerState(players);
        break;
      case 'stop':
        this.stopGame();
        break;
    }
  }

  stopGame() {
    this.audio.pause();
    document.getElementById('countdown').innerHTML = 'STOP !';
  }

  playMusic() {
    setTimeout(() => {
      this.audio.play();
    }, 500)
  }

  updatePlayerState(players) {
    this.setState({
      players: this.getPlayersNewState(players)
    });
  }

  getPlayersNewState(players) {
    let ply = []
    for(let i = 0; i < players.length; i++) {
      ply.push({
        id: players[i].id,
        score: players[i].score,
        balloonState: players[i].balloonState ? players[i].balloonState : 0,
        balloonScore: players[i].balloonScore ? players[i].balloonScore : 0,
        characterState: players[i].characterState ? players[i].characterState : 0,
        popEvent: players[i].popEvent ? players[i].popEvent : 0,
      });
    }

    return ply;
  }

  renderPlayerSpace(id) {
    console.log(this.state.players);
    if(id >= this.props.players.length) return null;

    return <PlayerSpace
      id={"player-" + (id + 1)}
      playerNum={id + 1}
      score={this.state.players[id].balloonScore}
      balloonState={this.state.players[id].balloonState}
      characterState={this.state.players[id].characterState}
      popEvent={this.state.players[id].popEvent}
    />
  }

  renderCountDown() {
    if(this.isCountDownCalled) {
      return (
        <div id="countdown"></div>
      );
    }
    this.isCountDownCalled = true;
    setTimeout(() => {
      document.getElementById('countdown').innerHTML = 'SET';
    }, 1500);
    setTimeout(() => {
      document.getElementById('countdown').innerHTML = 'PUMP!!';
    }, 3000);
    setTimeout(() => {
      document.getElementById('countdown').innerHTML = '';
      this.showTimer = true;
      this.forceUpdate();
    }, 4000);

    return(
      <div id="countdown">READY?</div>
    );
  }

  renderTimer() {
    if(!this.showTimer) return null;
    this.isTimerCalled = true;
    return (
      <div id="timer">
        <img src="/static/img/Game/time.png" />
        <div>
          <Timer
            initialTime={this.gameTime}
            direction="backward"
            checkpoints={[
              {
                time: 30 * 1000,
                callback: () => {
                  document.getElementById('countdown').innerHTML = '30s';
                  setTimeout(() => {
                    document.getElementById('countdown').innerHTML = '';
                  }, 1000);
                },
              },
              {
                time: 10 * 1000,
                callback: () => {
                  document.getElementById('countdown').innerHTML = '10s';
                  setTimeout(() => {
                    document.getElementById('countdown').innerHTML = '';
                  }, 1000);
                },
              }
            ]}
          >
            {() => (
              <React.Fragment>
                <Timer.Minutes /> :
                <Timer.Seconds />
              </React.Fragment>
            )}
          </Timer>
        </div>
      </div>
    );
  }

  render() {
    this.playMusic();
    return (
      <div className="row">
        {this.renderTimer()}
        {this.renderCountDown()}
        {this.renderPlayerSpace(0)}
        {this.renderPlayerSpace(1)}
        {this.renderPlayerSpace(2)}
      </div>
    );
  }
}

class PlayerSpace extends React.Component {
  constructor(props) {
    super(props);
  }

  getBalloonState() {
    if(this.props.characterState == 3) {
      return 'popped';
    } else {
      return this.props.balloonState;
    }
  }

  getCharacterState() {
    if(this.props.characterState == 3) {
      return 'surprised';
    } else {
      return this.props.characterState;
    }
  }

  renderPopEvent() {
    let popId = 'pop-' + this.props.id;
    if(this.props.popEvent == 1) {
      return (
        <h1 id={popId} className="pop-event">+1</h1>
      )
    } else if(this.props.popEvent == 2) {
      return (
        <h1 id={popId} className="pop-event">+0</h1>
      )
    } else {
      return null;
    }
  }

  renderScore() {
    let className = "character-score";
    return (
      <div className={className}>
        <img src="/static/img/Game/score.png" />
        <div>{this.props.score}</div>
      </div>
    );
  }

  render() {
    return (
      <div id={this.props.id} className="player-space col-md-4">
        {this.renderScore()}
        {this.renderPopEvent()}
        <Character
          id={this.props.id + "-character"}
          state={this.getCharacterState()}
          playerNum={this.props.playerNum}
        />
        <Balloon 
          id={this.props.id + "-balloon"}
          state={this.getBalloonState()}
        />
      </div>
    );
  }
}

class Balloon extends React.Component {
  constructor(props) {
    super(props);
  }

  getBalloonImage() {
    let balloonNum = (this.props.state + 1);
    return "/static/img/balloon/" + balloonNum + ".png";
  }

  render() {
    let balloonImage = this.getBalloonImage();
    return (
      <div 
        id={this.props.id}
        className="balloon"
        style={{
          width: 400,
          height: 400,
          backgroundImage: "url(" + balloonImage + ")",
          backgroundSize: "contain"
        }}
      >      
      </div>
    );
  }
}

class Character extends React.Component {
  constructor(props) {
    super(props);
  }

  getCharacterImage() {
    return "/static/img/Character/" + this.props.playerNum + "/" + this.props.state + ".png";
  }

  render() {
    let characterImage = this.getCharacterImage();
    return (
      <div 
        id={this.props.id}
        className="character"
        style={{
          height: 500,
          width: 250,
          backgroundImage: "url(" + characterImage + ")",
          backgroundSize: "cover"
        }}
      >
      </div>
    );
  }
}