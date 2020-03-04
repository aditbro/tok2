import client from './connection.js';
import MobileDisplay from './display.js'
var async = require('async');
let diffThreshold = 20

var display = new MobileDisplay();

let stateBuffer = []
function handleMotion(event) {
  if (event.acceleration.z > diffThreshold) {
    stateBuffer.push(event.acceleration.z);
  }
}

function handleScoring(next) {
  if (stateBuffer.length != 0) {
    addPoint();
    while (stateBuffer.length != 0) {
      let debug = { z: stateBuffer.pop() }
      client.send(JSON.stringify(debug));
    }
  }

  setTimeout(function () {
    next();
  }, 100);

}

async.forever(handleScoring, function (err) {
  console.error(err);
})

function addPoint() {
  let pointMessage = { action: "game_action", action_type: "pump" }
  display.addPoint();
  client.send(JSON.stringify(pointMessage));
}

export default handleMotion;