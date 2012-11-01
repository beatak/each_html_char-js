var eachHtmlChar = require('../src/eachhtmlchar.js').eachHtmlChar,
assert = require('assert');

module.exports = {
  'no arguments': function () {
    assert.throws(
      function () {
        eachHtmlChar();
      },
      Error,
      'should throw an error'
    );
  },

  '2 arguments, wrong type on 1st': function () {
    assert.throws(
      function () {
        eachHtmlChar(null, function (){});
      },
      Error,
      'should throw an error'
    );
  }
};