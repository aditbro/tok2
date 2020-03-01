const router = require("../../middlewares/router");
const serveStatic = require("serve-static");
jest.mock('serve-static');

describe('#router.addRoute', () => {
  it('add new routes to the module', () => {
    let req = {
      method: "GET",
      url: "/test"
    }
  
    const mockCallback = jest.fn();
    router.addRoute(req.method, req.url, mockCallback);
    router.routes(req, null);
  
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});

describe('#router.addStatic', () => {
  it("add static file serving", () => {
    let staticPath = "static";
    let mockFunction = jest.fn();
    let req = {
      method: "GET",
      url: "/static/test.js"
    }
  
    serveStatic.mockReturnValue(mockFunction);
  
    router.addStatic(staticPath);
    router.routes(req, null);
  
    expect(serveStatic.mock.calls.length).toBe(1);
    expect(mockFunction.mock.calls.length).toBe(1);
  });
});

describe('#router.routes', () => {
  it("returns 404, when request url not found", () => {
    let req = {
      method: "GET",
      url: "/undefined_path"
    }
    let res = {
      writeHead: jest.fn(),
      write: jest.fn(),
      end: jest.fn()
    }
  
    router.routes(req, res);
  
    expect(res.writeHead).toHaveBeenCalledWith(404);
    expect(res.write).toHaveBeenCalledWith("404 NOT FOUND");
    expect(res.end).toHaveBeenCalled();
  });

  it("calls the registered callback, when request url found", () => {
    let req = {
      method: "GET",
      url: "/test"
    }
  
    const mockCallback = jest.fn();
    router.addRoute(req.method, req.url, mockCallback);
    router.routes(req, null);
  
    expect(mockCallback).toHaveBeenCalledWith(req, null);
  });
});