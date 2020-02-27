import React from 'react';
import ReactDOM from 'react-dom';
import BalloonGame from './games/balloon.js';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

window.React = React;

var currentGame = BalloonGame;

function container() {
  return <div class="container-fluid">
    <currentGame />
  </div>
}

ReactDOM.render(container(), document.querySelector("#root"));