var Nucleus = require('nucleus');
var nucleus = new Nucleus();

setInterval(function () {
  nucleus.emit('ping', { foo: 'bar' });
}, 1000);

nucleus.on('pong', function (data) {
  console.log('pong received: ' + data);
});

