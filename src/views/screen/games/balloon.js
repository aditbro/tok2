'use strict';
import React from 'react';
import './balloon.css';

export default class BalloonGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    };

    this.comm = this.props.comm;
    this.comm.ongamemessage = (players) => {
      this.updatePlayerState(players);
    };
  }

  updatePlayerState(players) {
    let ply = []
    for(let i = 0; i < players.length; i++) {
      ply.push({
        id: players[i].id,
        score: players[i].score,
        balloonState: players[i].balloonState ? players[i].balloonState : 0,
        balloonScore: players[i].balloonScore ? players[i].balloonScore : 0,
        characterState: players[i].characterState ? players[i].characterState : 0,
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
        score={this.state.players[id].score}
        balloonState={this.state.players[id].balloonState}
        characterState={this.state.players[id].characterState}
      />
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="row">
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
        <Character
          id={this.props.id + "-character"}
          state={this.props.characterState}
        />
        <Balloon 
          id={this.props.id + "-balloon"}
          state={this.props.balloonState}
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
    let balloonNum = (this.props.state % 12) + 1;
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
          height: 700,
          width: 350,
          backgroundImage: "url(" + characterImage + ")",
          backgroundSize: "contain"
        }}
      >
      </div>
    );
  }
}