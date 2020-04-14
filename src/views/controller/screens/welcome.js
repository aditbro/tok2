import PumpMotionDetector from '../motionDetector/pump.js'
import React from 'react';
import './welcome.css';

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  startGame() {
    let startMsg = {"action": "start_game"};
    this.props.comm.send(JSON.stringify(startMsg));
  }

  render() {
    if(this.props.playerId == 1) {
      return (
        <div className="row">
          <div className="col-md-12" id="start-content">
            <h2 id="welcome-player-id">Player-{this.props.playerId}</h2>
            <h1 id="welcome-title">Press Start</h1>
            <img src="/static/img/start.png" onClick={() => this.startGame()} id="start-img"/>
          </div>
        </div>
      )
    } else {
      return (
        <div className="row">
          <div className="col-md-12" id="start-content">
            <h2 id="welcome-player-id">Player-{this.props.playerId}</h2>
            <h1 id="welcome-title">Wait Until Player-1 Press Start</h1>
          </div>
        </div>
      )
    }
  }
}