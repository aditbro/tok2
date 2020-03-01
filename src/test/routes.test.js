var mockFunction = jest.fn();
const serveStatic = require("serve-static");
jest.mock('serve-static');
serveStatic.mockReturnValue(mockFunction);
const routes = require('../routes');


describe('#routes', () => {
  describe('routes /screen', () => {
    it('redirects to screen static html file', () => {
      let req = { url: '/screen', method: 'GET' }
      let res = { 
        writeHead: jest.fn(),
        end: jest.fn()
      }

      routes.routes(req, res);
      expect(res.writeHead).toHaveBeenCalledWith(301, {
        "Location": "/static/screen/main.html"
      })
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe('routes /controller', () => {
    it('redirects to controller static html file', () => {
      let req = { url: '/controller', method: 'GET' }
      let res = { 
        writeHead: jest.fn(),
        end: jest.fn()
      }

      routes.routes(req, res);
      expect(res.writeHead).toHaveBeenCalledWith(301, {
        "Location": "/static/controller/main.html"
      });
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe('routes static file /static', () => {
    it('calls serveStatic to serve static file', () => {
      let req = { url: '/static/file.js', method: 'GET' }
      let res = { 
        writeHead: jest.fn(),
        end: jest.fn()
      }

      routes.routes(req, res);
      expect(mockFunction.mock.calls[0][0]).toBe(req);
      expect(mockFunction.mock.calls[0][1]).toBe(res);
    });
  });
});