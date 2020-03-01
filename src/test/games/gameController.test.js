const GameController = require('../../games/gameController');

describe('#GameController', () => {
  describe('msg: add_screen', () => {
    it('add screen socket to the game', done => {
      let addMsg = { action: 'add_screen' }
      let mockScreen = {
        send: function(msg) {
          expectedMessage = {message:"screen registered"};
          expect(msg).toBe(JSON.stringify(expectedMessage));
          done();
        }
      }
      let controller = new GameController();
      controller.receiveMessage(mockScreen, addMsg);
    });
  });

  describe('msg: add_player', () => {
    it('add player socket to the game', () => {
      let addMsg = { action: 'add_player' }
      let mockPlayer = {
        send: jest.fn()
      }
      let controller = new GameController();
      controller.receiveMessage(mockPlayer, addMsg);

      expectedMessage = {
        message: "player registration accepted",
        id: 1,
        action: "assign_id"
      };
      expect(mockPlayer.send).toHaveBeenCalledWith(JSON.stringify(expectedMessage));
    });

    it('rejects when there are 3 players already', () => {
      let addMsg = { action: 'add_player' }
      let mockPlayer = {
        send: jest.fn()
      }
      let mockExtraPlayer = {
        send: jest.fn()
      }
      let controller = new GameController();
      controller.receiveMessage(mockPlayer, addMsg);
      controller.receiveMessage(mockPlayer, addMsg);
      controller.receiveMessage(mockPlayer, addMsg);
      controller.receiveMessage(mockExtraPlayer, addMsg);

      expectedMessage = {
        message: "player registration rejected"
      };
      expect(mockExtraPlayer.send).toHaveBeenCalledWith(JSON.stringify(expectedMessage));
    });
  });

  describe('msg: game_action', () => {
    it('passes the message to game object', () => {
      let addPlayerMsg = { action: 'add_player' }
      let addScreenMsg = { action: 'add_screen' }
      let gameMessage = {
        action: 'game_action',
        message: 'test'
      }
      let mockScreen = {
        send: jest.fn()
      }
      let mockPlayer = {
        send: jest.fn()
      }
      let mockGame = jest.fn((players, screen, callback) => {
        this.players = players;
        this.screen = screen;
        this.receiveMessage = function (ws, msg) {
          this.players.map((player, idx) => {
            player.socket.send(JSON.stringify(msg));
          });
          this.screen.socket.send(JSON.stringify(msg));
        };

        return this;
      });

      let controller = new GameController();
      controller.receiveMessage(mockPlayer, addPlayerMsg);
      controller.receiveMessage(mockScreen, addScreenMsg);
      controller.assignGame(mockGame);
      controller.receiveMessage(jest.fn(), gameMessage);
      expect(mockPlayer.send).toHaveBeenCalledWith(JSON.stringify(gameMessage));
      expect(mockScreen.send).toHaveBeenCalledWith(JSON.stringify(gameMessage));
    });
  });
});