var Nucleus = require('../');
var nucleus = new Nucleus();

nucleus.on('connection', function (peer) {
  console.log(peer.name + ' connected');
  console.log(nucleus.peers);
});

nucleus.on('disconnection', function (peer) {
  console.log(peer.name + ' disconnected');
  console.log(nucleus.peers);
});

