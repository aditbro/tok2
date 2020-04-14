import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import BalloonGame from './screens/balloon.js';
import PlayerRegistration from './screens/playerRegistration.js'
import client from './connection.js';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

window.React = React;

var gameSequence = [
  BalloonGame
];

var gameSequenceIndex = 0;

var CurrentScreen = PlayerRegistration;

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.client = client;
    this.client.onmessage = (message) => {
      this.handleMessage(message);
    };
    this.state = {
      players: []
    }
  }

  registerPlayer(players) {
    let ply = this.state.players.slice();
    for(let i = 0; i < players.length; i++){
      ply.push({
        id: players[i].id,
        score: players[i].score
      });
    }

    this.setState({
      players: ply
    });
  }

  handleMessage(msg) {
    msg = JSON.parse(msg.data);
    console.log(msg);
    if(msg.action == 'game_action') {
      this.client.ongamemessage(msg);
    } else if(msg.action == 'register_player') {
      this.registerPlayer(msg.players);
      this.client.ongamemessage(msg)
    } else if(msg.action == 'start_game') {
      $('body').fadeOut("slow", "linear", () => {
        CurrentScreen = gameSequence[0];
        this.forceUpdate();
        console.log(CurrentScreen);
        console.log(this.state)
      });

      $('body').fadeIn("fast", "linear");
    }
  }

  gameFinishedCallback(playersScore) {
    let ply = this.state.players.slice();
    for(let i = 0; i < playersScore.length; i++) {
      ply[i].score += playersScore[i]
    }

    gameSequenceIndex++;
    CurrentScreen = gameSequence[gameSequenceIndex];

    this.setState({
      players: ply
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <CurrentScreen comm={this.client} players={this.state.players}/>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.querySelector("#root"));