var process = require('../lib/eachhtmlchar.js').process,
assert = require('assert');

module.exports = {
  'no arguments': function () {
    assert.throws(
      function () {
        process();
      },
      Error,
      'should throw an error'
    );
  },

  '2 arguments, wrong type on 1st': function () {
    assert.throws(
      function () {
        process(null, function (){});
      },
      Error,
      'should throw an error'
    );
  }
};