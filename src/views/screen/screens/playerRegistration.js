'use strict';
import React from 'react';
import './playerRegistration.css';

export default class PlayerRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    };

    this.comm = this.props.comm;
    this.comm.ongamemessage = (msg) => {
      this.handleMessage(msg);
    };
    this.audio = new Audio('/static/img/Sound/bgm.mp3');
  }

  handleMessage(msg) {
    switch(msg.action) {
      case 'register_player':
        let players = msg.players;
        this.updatePlayerState(players);
        break;
      case 'stop':
        this.stopMusic();
        break;
    }
  }

  stopMusic() {
    this.audio.pause();
  }

  playMusic() {
    console.log(this.audio);
    setTimeout(() => {
      this.audio.play();
    }, 500)
  }

  updatePlayerState(players) {
    let ply = []
    for(let i = 0; i < players.length; i++) {
      ply.push({
        id: players[i].id
      });
    }
    this.setState({
      players: ply
    });
  }

  renderPlayerSpace(id) {
    console.log(this.state.players)
    if(this.state.players[id]){
      return <PlayerSpace
        id={"player-" + (id + 1)} 
      />
    } else {
      return null;
    }
  }

  renderWelcomeScreen() {
    let host = window.location.host;
    return (
      <div id="welcome-msg" className="col-md-12">
        <img src="/static/img/logo.png" />
        <p>open {host} from your mobile phone to play</p>
        <p>Player 1 Press <strong>START</strong> To Start Game</p>
      </div>
    );
  }

  renderBalloonBG() {
    return(
      <img src="/static/img/balloon-bg.gif" id="balloon-bg" />
    )
  }

  render() {
    return (
      <div className="row" onClick={() => { this.playMusic(); } }>
        {this.renderBalloonBG()}
        {this.renderWelcomeScreen()}
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

  render() {
    return (
      <div id={this.props.id} className="player-space col-md-4">
        {/* <Character
          id={this.props.id + "-character"}
        /> */}
      </div>
    );
  }
}

class Character extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let characterImage = this.getCharacterImage();
    return (
      <div 
        id={this.props.id}
        className="character"
        style={{
          height: 600,
          width: 300,
          backgroundImage: "url(" + characterImage + ")",
          backgroundSize: "cover"
        }}
      >
      </div>
    );
  }
}