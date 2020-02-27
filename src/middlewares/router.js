var finalhandler = require('finalhandler')
var serveStatic = require('serve-static')

var staticPath;
var staticServer;
var routesCallback = {}

exports.addRoute = function (method, path, callback) {
  routesCallback[method+path] = callback;
}

exports.addStatic = function (basePath) {
  staticPath = basePath;
  staticServer = serveStatic('.', {'fallthrough': false});
}

exports.routes = function (req, res) {
  if(req.url.split('/')[1] === staticPath) {
    staticServer(req, res, finalhandler(req, res));
  } else {
    execRoute(req, res);
  }
}

execRoute = function (req, res) {
  let method = req.method;
  let path = req.url;
  
  try {
    routesCallback[method+path](req, res);
  } catch(err) {
    res.writeHead(404);
    res.write("404 NOT FOUND");
    res.end();
  }
}