/*
 * Nucleus.on
 * Register event with EE2
 */
module.exports.on = function (name, cb) {
  return this.ee.on(name, cb);
}

/*
 * Nucleus.emit
 */
module.exports.emit = function (name, data) {
  this.broadcast({
    name: name,
    data: data
  });
  return this.ee.emit(name, data);
}
