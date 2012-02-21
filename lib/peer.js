var net = require('net');

var Peer = function (options) {
  options = options || {};
  this._ = options;
  this.$ = net.connect(
    this._.port,
    this._.host,
    this.connectionHandler
  );
}

Peer.prototype.send = function () {
  
}

Peer.prototype.connectionHandler = function () {
  console.log(arguments);
}

module.exports = Peer;
