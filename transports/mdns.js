var mdns = require('mdns');
var Peer = require('../lib/peer');
var mDNSTransport = {};

mDNSTransport.browse = function (parent) {
  var _ = parent._.browser = mdns.createBrowser(
    mdns.tcp('nucleus')
  );

  /*
   * Determine if a service originates from localhost
   * Depends on Nucleus#buildLocalAddresses firing before this
   * mDNS doesn't have a filter for this :(
   */
  var isSelf = function (service) {
    var found = false;
    for (var i in service.addresses) {
      if (~parent._.addresses.indexOf(service.addresses[i])) {
        // there is a better way to do this
        // if there are multiple service addresses
        // we must choose one to connect to
        if (service.port == parent.port) {
          found = true;
          break;
        }
      }
    }
    return found;
  }

  /*
   * Return the index of given `service`
   * inside Nucleus#peers
   */
  var locatePeer = function (service) {
    var found = false;
    for (var i in parent.peers) {
      if (parent.peers[i]._.name == service.name) {
        found = true;
        break;
      }
    }
    return found && i;
  }

  /*
   * Respond to a discovered Peer
   */
  _.on('serviceUp', function(service) {
    if (!isSelf(service)) {
      var peer = {
        parent: parent,
        host: service.addresses[0],
        port: service.port,
        name: service.name
      }
      parent.peers.push(new Peer(peer));
      parent.ee.emit('connection', peer);
    }
  });

  /*
   * Handle a Peer going down
   * Hopefully happens after connection
   * and peer construction
   */
  _.on('serviceDown', function(service) {
    var i = locatePeer(service);
    var p = parent.peers[i]._;
    delete parent.peers[i];
    parent.ee.emit('disconnection', p);
  });

  _.start();
}

/*
 * Trigger an mDNS advertisement as a "nucleus" service
 * Always running
 */
mDNSTransport.advertise = function (parent) {
  var _ = parent._.ad = mdns.createAdvertisement(
    mdns.tcp('nucleus'),
    parent.port
  );

  _.start();
}

module.exports = mDNSTransport;
