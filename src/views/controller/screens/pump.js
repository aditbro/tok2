import PumpMotionDetector from '../motionDetector/pump.js'
import React from 'react';
import './pump.css';

export default class PumpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.motionDetector = PumpMotionDetector;
    this.motionDetector.onPumpUp = () => {
      this.onPumpUp()
    }
    this.motionDetector.onPumpDown = () => {
      this.onPumpDown()
    }
    this.motionDetector.start();
    this.pumpState = 'up';
  }

  onPumpUp() {
    if(this.pumpState == 'down') {
      this.pumpState = 'up';
      let pumpUpMessage = {
        action: "game_action",
        action_type: "pumpUp",
        id: this.props.playerId
      }
      this.props.comm.send(JSON.stringify(pumpUpMessage));
    }
  }
  
  onPumpDown() {
    if(this.pumpState == 'up') {
      this.pumpState = 'down';
      let pumpUpMessage = {
        action: "game_action",
        action_type: "pump",
        id: this.props.playerId
      }
      this.props.comm.send(JSON.stringify(pumpUpMessage));
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1 id="pump-title">Pump!</h1>
          <h2 id="pump-player-id">Player-{this.props.playerId}</h2>
          <div id="pump-btn-ok"></div>
        </div>
      </div>
    )
  }
}