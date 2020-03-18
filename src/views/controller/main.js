import React from 'react';
import ReactDOM from 'react-dom';
import client from './connection.js';
import PumpScreen from './screens/pump.js';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

window.React = React;
var CurrentScreen = PumpScreen;

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.client = client;
    this.client.onmessage = (message) => {
      this.handleMessage(message);
    };
    this.playerId;
  }

  handleMessage(msg) {
    msg = JSON.parse(msg.data);
    console.log(msg);
    if(msg.action === 'assign_id') {
      this.playerId = msg.id;
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <CurrentScreen comm={client} playerId={this.playerId}/>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.querySelector("#root"));
