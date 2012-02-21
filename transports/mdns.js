var mdns = require('mdns');
var Peer = require('../lib/peer');
var mDNSTransport = {};

mDNSTransport.browse = function (parent) {
  var _ = parent._.browser = mdns.createBrowser(
    mdns.tcp('nucleus')
  );

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

  _.on('serviceDown', function(service) {
    var i = locatePeer(service);
    var p = parent.peers[i]._;
    delete parent.peers[i];
    parent.ee.emit('disconnection', p);
  });

  _.start();
}

mDNSTransport.advertise = function (parent) {
  var _ = parent._.ad = mdns.createAdvertisement(
    mdns.tcp('nucleus'),
    parent.port
  );

  _.start();
}

module.exports = mDNSTransport;
