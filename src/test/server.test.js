const gameController = require('../games/gameController');
const axios = require('axios');
const router = require('../routes');;
const server = require('../server');

describe("normal http request", () => {
  it("forward the request to router", () => {
    router.routes = jest.fn((req, res) => {
      res.end();
    });
  
    let screenPath = '/screen';  
  
    return axios({
      method: 'get',
      url: 'http://127.0.0.1:8080/screen'
    })
      .then((response) => {
        expect(router.routes.mock.calls[0][0].url).toBe(screenPath);
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {
        server.server.close();
      });
  });
});