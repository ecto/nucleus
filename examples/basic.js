var Nucleus = require('../');
var nucleus = new Nucleus();

nucleus.on('connection', function (node) {
  console.log(node.id + ' connected');
  console.log(this.peers);
});

nucleus.on('disconnection', function (node) {
  console.log(node.id + ' disconnected');
  console.log(this.peers);
});

