var p = require('../lib/eachhtmlchar.js'),
getNext = p._getNext,
getEntityClosing = p._getEntityClosing,
getTagClosing = p._getTagClosing,
assert = require('assert');

module.exports = {
  'getNext': function () {
    assert.equal('b', getNext(['abc', 1], p.COUNT_AS_ONE, p.COUNT_AS_ONE));
  }

};