const BalloonGame = require('../../games/balloon');
const mockSocket = function() {
  return {
    send: jest.fn()
  }
}
const createPlayer = function(id) {
  return {
    socket: mockSocket(),
    id: id,
    score: 0
  };
}
const createScreen = function() {
  return {
    socket: mockSocket()
  }
}

describe('#message mobile:pump', () => {
  it('updates player score and send the event to screen', () => {
    let player = [createPlayer(1)];
    let screen = createScreen();
    let endCallback = jest.fn();
    let actMessage = {
      id: 1,
      action: 'game_action',
      action_type: 'pump'
    }
    let game = new BalloonGame(player, screen, endCallback);
    let expectedScreenMessage = {
      action: 'game_action',
      players: [
        {
          id: 1,
          balloonState: 1,
          balloonScore: 0,
          characterState: 1,
          score: 0
        }
      ]
    }

    game.receiveMessage(mockSocket(), actMessage);
    expect(screen.socket.send)
      .toHaveBeenCalledWith(JSON.stringify(expectedScreenMessage));
  });
});