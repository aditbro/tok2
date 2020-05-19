'use strict';
import React from 'react';
import './balloon.css';
import 'react-compound-timer';

export default class BalloonGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: this.getPlayersNewState(this.props.players)
    };
    this.isCountDownCalled = false;

    this.comm = this.props.comm;
    this.comm.ongamemessage = (msg) => {
      let players = msg.players;
      this.updatePlayerState(players);
    };
    this.audio = new Audio('/static/img/Sound/gamebgm.mp3');
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
    console.log(this.state.players)
    if(this.state.players[id]){
      return <PlayerSpace
        id={"player-" + (id + 1)}
        playerNum={id + 1}
        score={this.state.players[id].score}
        balloonState={this.state.players[id].balloonState}
        characterState={this.state.players[id].characterState}
        popEvent={this.state.players[id].popEvent}
      />
    } else {
      return null;
    }
  }

  renderCountDown() {
    setTimeout(() => {
      document.getElementById('countdown').innerHTML = 'SET';
    }, 2000);
    setTimeout(() => {
      document.getElementById('countdown').innerHTML = 'GO!';
    }, 3500);
    setTimeout(() => {
      document.getElementById('countdown').innerHTML = '';
    }, 4000);

    return(
      <div id="countdown">READY?</div>
    );
  }

  render() {
    this.playMusic();
    return (
      <div className="row">
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

  render() {
    return (
      <div id={this.props.id} className="player-space col-md-4">
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