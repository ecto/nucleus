var mdns = require('mdns');

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

  _.on('serviceUp', function(service) {
    if (!isSelf(service)) {
      console.log(service);
    }
  });

  _.on('serviceDown', function(service) {
    console.log("service down: ", service);
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
