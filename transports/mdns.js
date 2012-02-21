var mdns = require('mdns');
var mDNSTransport = {};

mDNSTransport.browse = function (parent) {
  var _ = parent._.browser = mdns.createBrowser(
    mdns.tcp('nucleus')
  );

  _.on('serviceUp', function(service) {
    console.log("service up: ", service);
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
