var net = require('net');

var Peer = function (options) {
  options = options || {};
  this._ = options;
  this.$ = net.connect(
    this._.host,
    this._.port,
    this.connectionHandler
  );
}

Peer.prototype.send = function () {
  
}

Peer.prototype.connectionHandler = function () {
  console.log(arguments);
}

module.exports = Peer;
