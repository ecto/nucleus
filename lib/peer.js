var net = require('net');

var Peer = function (options) {
  options = options || {};
  this._ = options;
  var that = this;
  this.$ = net.connect(
    this._.port,
    this._.host,
    function () {
      that.handleConnection(arguments);
    }
  );
}

Peer.prototype.send = function (data) {
  console.log('sending:');
  console.log(data);
  this.$.write(data.toString() + '\r\n');
}

Peer.prototype.handleConnection = function (client) {
  var that = this;
  this._.parent.ee.emit('peer.connection', client);
  this.$.on('data', function () {
    that.handleIncomingMessage(arguments);
  });
}

Peer.prototype.handleIncomingMessage = function () {
  console.log(arguments);
}

module.exports = Peer;
