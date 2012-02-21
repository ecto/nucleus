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

var net = require('net');
var ee2 = require('eventemitter2');
var util = require('util');
var fs = require('fs');
var Peer = require('lib/peer');

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
  this.loadTransport();
}

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

Nucleus.prototype.on = function () {}
Nucleus.prototype.emit = function () {}

module.exports = Nucleus;
