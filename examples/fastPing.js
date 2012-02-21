var Nucleus = require('../');
var nucleus = new Nucleus();

setInterval(function () {
  nucleus.emit('ping', { foo: 'bar' });
}, 10);

nucleus.on('pong', function (data) {
  console.log('pong received: ' + data);
});

