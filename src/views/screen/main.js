import React from 'react';
import ReactDOM from 'react-dom';
import BalloonGame from './games/balloon.js';
import client from './connection.js';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

window.React = React;

var CurrentGame = BalloonGame;

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: client,
      players: players
    }
  }

  handleMessage(msg) {
    msg = JSON.parse(msg);
    if(msg.action == 'game_action') {
      this.state.client.ongamemessage(msg);
    } else if(msg.action == 'register_player') {
      this.registerPlayer(msg.players);
    }
  }

  registerPlayer(players) {
    for(let i = 0; i < players.length; i++){
      this.state.players[i].id = players[i].id;
      this.state.players[i].score = players[i].score;
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <CurrentGame comm={this.client} players={this.players}/>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.querySelector("#root"));