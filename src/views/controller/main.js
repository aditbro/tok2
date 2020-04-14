import React from 'react';
import ReactDOM from 'react-dom';
import client from './connection.js';
import PumpScreen from './screens/pump.js';
import WelcomeScreen from './screens/welcome.js';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

window.React = React;
var CurrentScreen = WelcomeScreen;

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.client = client;
    this.client.onmessage = (message) => {
      this.handleMessage(message);
    };
    this.playerId;
  }

  changeScreen(screenName) {
    if(screenName == 'pump') {
      CurrentScreen = PumpScreen;
    }

    this.forceUpdate();
  }

  handleMessage(msg) {
    msg = JSON.parse(msg.data);
    console.log(msg);

    if(msg.action === 'assign_id') {
      this.playerId = msg.id;
      this.forceUpdate();
    } else if(msg.action == 'change_screen') {
      this.changeScreen(msg.screen);
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
