var Nucleus = require('../');
var nucleus = new Nucleus();

nucleus.on('ping', function (data) {
  this.emit('pong', { foo: 'bar' });
});

