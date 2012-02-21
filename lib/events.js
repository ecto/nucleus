/*
 * Nucleus.on
 * Register event with EE2
 */
module.exports.on = function (key, cb) {
  return this.ee.on(key, cb);
}

/*
 * Nucleus.emit
 */
module.exports.emit = function (key, data) {
  return this.ee.emit(key, data);
}
