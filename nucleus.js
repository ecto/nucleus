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
var ee = require('ee2');
var util = require('util');

/*
 * Create a new Nucleus object
 * Parse options
 * Trigger node browser
 */
var Nucleus = function (options) {
  options = options || {};
  if (options.redis) {

  }

}

util.inherits(Nulceus, ee2);
module.exports = Nucleus;
