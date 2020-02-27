var router = require('./middlewares/router')

router.addRoute('GET','/mobile', function (req, res) {
  res.writeHead(301, {
    "Location": "/static/controller/main.html"
  })
  res.end();
});

router.addRoute('GET','/screen', function (req, res) {
  res.writeHead(301, {
    "Location": "/static/screen/main.html"
  })
  res.end();
});

router.addStatic('static');

exports.routes = router.routes;