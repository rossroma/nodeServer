var compression = require('compression')
var express = require('express');
var vhost = require('vhost');
var app = module.exports = express();

app.use(compression({filter: shouldCompress}))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

app.use(vhost('demo.rossroma.com', require('./demo/index.js')));
app.use(vhost('movie.rossroma.com', require('./movieServer/api.js')));
app.use(vhost('chi.rossroma.com', require('./dinner/api.js')));
app.use(vhost('test.rossroma.com', require('./wcm/api.js')));
app.use(vhost('www.rossroma.com', require('./movieServer/api.js')));
app.use(vhost('rossroma.com', require('./movieServer/api.js')));
app.use(vhost('127.0.0.1', require('./movieServer/api.js')));

var server = app.listen(80, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("启动服务，访问地址为 http://%s:%s", host, port)

})
