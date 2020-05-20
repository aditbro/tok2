import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import BalloonGame from './screens/balloon.js';
import PlayerRegistration from './screens/playerRegistration.js';
import LeaderBoard from './screens/leaderboard.js';
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

  registerPlayer(msg) {
    let players = msg.players;
    let ply = [];

    for(let i = 0; i < players.length; i++){
      ply.push({
        id: players[i].id,
        score: players[i].score
      });
    }

    this.setState({
      players: ply
    });

    this.client.ongamemessage(msg);
  }

  handleMessage(msg) {
    msg = JSON.parse(msg.data);
    console.log(msg);

    switch(msg.action) {
      case 'game_action':
        this.client.ongamemessage(msg);
        break;
      case 'register_player':
        this.registerPlayer(msg);
        break;
      case 'start_game':
        this.startGame(msg);
        break;
      case 'show_leaderboards':
        this.switchToLeaderBoard(msg);
        break;
    }
  }

  startGame() {
    let stopMsg = { 'action': 'stop' }
    this.client.ongamemessage(stopMsg);
    setTimeout(() => {
      this.changeScreen();
    })
  }

  changeScreen() {
    $('body').fadeOut("slow", "linear", () => {
      CurrentScreen = gameSequence[0];
      this.forceUpdate();
      console.log(CurrentScreen);
      console.log(this.state)
    });

    $('body').fadeIn("fast", "linear");
  }

  switchToLeaderBoard(msg) {
    CurrentScreen = LeaderBoard;
    this.state.players = [];
    this.registerPlayer(msg);
    this.forceUpdate();
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