import React from 'react';
import ReactDOM from 'react-dom';
import BalloonGame from './games/balloon.js';
import client from './connection.js';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

window.React = React;

var CurrentGame = BalloonGame;

class Container extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <CurrentGame />
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.querySelector("#root"));

client.onmessage = function(msg) {
  console.log("Received: '" + e.data + "'");
};