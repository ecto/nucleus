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
  this.port = options.port || 42;
  this.ee = new ee2();
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
 * Say cheese
 */
module.exports = Nucleus;
