var eachchar = require('../lib/eachhtmlchar.js'),
assert = require('assert');

module.exports = {
  'foo': function () {
    assert.equal(true, true);
  },
  'bar': function () {
    assert.notEqual(true, false);
  }
};