import React from 'react';
import ReactDOM from 'react-dom';
import MobileDisplay from './display.js'
import client from './connection.js';
import handleMotion from './eventHandler.js'
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

window.React = React;

class Container extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <MobileDisplay />
      </div>
    );
  }
}

window.addEventListener('devicemotion', handleMotion);

ReactDOM.render(<Container />, document.querySelector("#root"));
