var eachHtmlChar = require('../src/eachhtmlchar.js').eachHtmlChar,
assert = require('assert');

module.exports = {
  'eachHtmlChar: 0': function () {
    var str = 'ab&foo;0&hellip;';
    var expec = ['a', 'b', '&foo;', '0', '&hellip;'];
    var i = 0;
    eachHtmlChar(
      str,
      function (index, word) {
        // console.log('test 0', index, word, i, expec[i]);
        assert.equal(expec[i], word);
        ++i;
      }
    );
  },

  'eachHtmlChar: 1': function () {
    var str = 'ab&foo;0';
    var expec = ['a', 'b', '&foo;', '0'];
    var i = 0;
    var result = eachHtmlChar(str);
    assert.deepEqual(expec, result);
  },

  'eachHtmlChar: 2': function () {
    var str = 'ab&foo;0';
    var expec = ['a', 'b', '&foo;'];
    var i = 0;
    var result = eachHtmlChar(
      str,
      function (index, word) {
        if (word.length > 1) {
          return false;
        }
      }
    );
    assert.deepEqual(expec, result);
  }

};