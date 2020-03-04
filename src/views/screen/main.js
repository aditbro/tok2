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
      this.client.ongamemessage(msg.players);
    } else if(msg.action == 'register_player') {
      this.registerPlayer(msg.players);
      this.client.ongamemessage(msg.players)
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <CurrentGame comm={this.client} players={this.state.players}/>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.querySelector("#root"));