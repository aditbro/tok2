const pumpDetector = {};

pumpDetector.upThreshold = 10;
pumpDetector.downThreshold = 20;

pumpDetector.handleMotion = (event) => {
  if (event.acceleration.z > pumpDetector.downThreshold) {
    console.log("down");
    pumpDetector.onPumpUp();
  } else if(event.acceleration.z < -pumpDetector.upThreshold) {
    console.log("up");
    pumpDetector.onPumpDown();
  }
};

pumpDetector.start = () => {
  window.addEventListener('devicemotion', pumpDetector.handleMotion);
}

pumpDetector.stop = () => {
  window.removeEventListener('devicemotion', pumpDetector.handleMotion);
}

export default pumpDetector;