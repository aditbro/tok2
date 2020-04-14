const pumpDetector = {};
pumpDetector.currentPower = 0;
pumpDetector.upThreshold = 10;
pumpDetector.downThresholds = [16, 18, 20, 22, 25];
pumpDetector.pumpBuffer = [];
pumpDetector.pumpUp = function () {
  let pointMessage = { action: "game_action", action_type: "pump_up" }
}

pumpDetector.pumpDown = function (power) {
  let pointMessage = { action: "game_action", action_type: "pump_down", power: power }
  client.send(JSON.stringify(pumpPayload))
}

pumpDetector.handleMotion = (event) => {
  if (event.acceleration.z > pumpDetector.downThresholds[0]) {
    console.log("down");
    pumpDetector.pumpBuffer.push(event.acceleration.z);

  } else if (event.acceleration.z < -pumpDetector.upThreshold) {
    console.log("up");
    pumpDetector.pumpBuffer.push(event.acceleration.z);
  }
};

pumpDetector.start = () => {
  window.addEventListener('devicemotion', pumpDetector.handleMotion);
  pumpDetector.isRunning = true
  pumpDetector.handleScoring();
}

pumpDetector.stop = () => {
  window.removeEventListener('devicemotion', pumpDetector.handleMotion);
  pumpDetector.isRunning = false
}

pumpDetector.handleScoring = async function () {
  while (true && pumpDetector.isRunning) {
    if (pumpDetector.pumpBuffer.length != 0) {
      let maxPower = 0;
      let pumpingDown = false;
      while (pumpDetector.pumpBuffer.length != 0) {
        let val = pumpDetector.pumpBuffer.pop();

        if (val < 0 && !pumpingDown) {
          pumpDetector.pumpUp();
        } else if (val < 0 && pumpingDown) { // Transition from pumping down to pumping up, need to send the max power
          pumpDetector.pumpDown(maxPower);
          pumpDetector.pumpUp();
          pumpingDown = false;
          break;
        } else if (val > 0) {
          while (val > pumpDetector.downThresholds[maxPower] && maxPower < 4) {
            maxPower++;
          }
          pumpingDown = true;
        }

        let debug = { z: val, pow: maxPower }
        client.send(JSON.stringify(debug));

      }

    }
  }
}

export default pumpDetector;