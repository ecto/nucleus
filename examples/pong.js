var Nucleus = require('../');
var nucleus = new Nucleus();

nucleus.on('ping', function (data) {
  nucleus.emit('pong', { foo: 'bar' });
});

