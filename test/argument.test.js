var iterate = require('../lib/eachhtmlchar.js').iterate,
assert = require('assert');

module.exports = {
  'no arguments': function () {
    assert.throws(
      function () {
        iterate();
      },
      Error,
      'should throw an error'
    );
  },

  '1 arguments': function () {
    assert.throws(
      function () {
        iterate('foo');
      },
      Error,
      'should throw an error'
    );
  },

  '2 arguments, wrong type on 1st': function () {
    assert.throws(
      function () {
        iterate(null, function (){});
      },
      Error,
      'should throw an error'
    );
  },

  '2 arguments, wrong type on 2nd': function () {
    assert.throws(
      function () {
        iterate('foo', 'bar');
      },
      Error,
      'should throw an error'
    );
  }
};