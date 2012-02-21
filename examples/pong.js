var Nucleus = require('nucleus');
var nucleus = new Nucleus();

nucleus.on('pong', function (data) {
  this.emit('ping', { foo: 'bar' });
});

