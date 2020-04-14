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
      console.log(msg);
      let players = msg.players;
      this.updatePlayerState(players);
    };
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
      <div className="row">
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

  getCharacterImage() {
    if(this.props.state === 0) {
      return "/static/img/char1.png";
    } else {
      return "/static/img/char3.png";
    }
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