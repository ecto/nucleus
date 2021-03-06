/*
 * nucleus
 * <cam@onswipe.com>
 */

/*
 * node discovery
 * node drops
 * heartbeating?
 * emission broadcasting
 * incoming emissions
 */

var os = require('os');
var ee2 = require('eventemitter2').EventEmitter2;
var net = require('net');

/*
 * Create a new Nucleus object
 * Parse options
 * Trigger transport loading
 */
var Nucleus = function (options) {
  options = options || {};
  this.peers = [];
  this._ = {};
  this._.transport = options.redis ? 'redis' : 'mdns';
  this.port = options.port || 42000;
  this.ee = new ee2();
  this.createServer();
  this.buildLocalAddresses();
  this.loadTransport();
}

/*
 * Pretend to be an EventEmitter
 */
Nucleus.prototype = require(__dirname + '/lib/events.js');

/*
 * Load our advertisement transport
 * Trigger browser
 */
Nucleus.prototype.loadTransport = function () {
  var t = this._.transport;
  this.transport = require(__dirname + '/transports/' + t);
  this.transport.browse(this); // need to provide context to the transport
  this.transport.advertise(this);
}

/*
 * Compile an easily-searchable array
 * of local addresses
 */
Nucleus.prototype.buildLocalAddresses = function () {
  this._.addresses = [];
  var interfaces = os.networkInterfaces();
  for (var i in interfaces) {
    for (var j in interfaces[i]) {
      this._.addresses.push(
        interfaces[i][j].address
      );
    }
  }
}

/*
 * Set up a TCP server to listen for Peer clients
 */
Nucleus.prototype.createServer = function () {
  var that = this;
  this.$ = net.createServer(function (socket) {
    that.connectionHandler(socket);
  });
  this.$.listen(this.port, function () {
    that.ee.emit('server.ready');
  });
}

/*
 * Handle a Peer client connecting to TCP server
 */
Nucleus.prototype.connectionHandler = function (socket) {
  var that = this;
  socket.on('data', function (data) {
    data = data.toString();
    data = data.split('\r\n');
    if (!data[data.length - 1]) data.pop();
    for (var i in data) {
      try {
        var m = JSON.parse(data[i]);
      } catch (e) {}
      if (m) {
        that.ee.emit(m.name, m.data);
      } else {
        if (!socket.messageBuffer) socket.messageBuffer = [];
        socket.messageBuffer.push(data[i]);
        console.log(data[i]);
        console.log(socket.messageBuffer);
      }
    }
  });

  // Do we need to do any cleanup here?
  socket.on('end', function () {});
}

/*
 * Write to all TCP Peer clients
 */
Nucleus.prototype.broadcast = function (data) {
  for (var i in this.peers) {
    if (this.peers[i].$.writable) {
      this.peers[i].send(data);
    }
  }
}

/*
 * Say cheese
 */
module.exports = Nucleus;
