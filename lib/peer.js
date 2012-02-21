var net = require('net');

/*
 * Construct a Peer object
 * Connect to the discovered node
 * Handle reconnections
 */
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

/*
 * Handle a successful connection
 */
Peer.prototype.handleConnection = function (client) {
  var that = this;
  this._.parent.ee.emit('peer.connection', client);
}

/*
 * Send data via Peer connection
 * Should intelligently cast `data`
 */
Peer.prototype.send = function (data) {
  this.$.write(JSON.stringify(data) + '\r\n');
}

module.exports = Peer;
