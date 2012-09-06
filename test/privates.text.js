var p = require('../lib/eachhtmlchar.js'),
getNext = p._getNext,
getEntity = p._getEntity,
getTag = p._getTag,
assert = require('assert');

module.exports = {

  'getEntity: null': function () {
    assert.equal(null, getEntity('foobar'));
  },

  'getEntity: 0': function () {
    assert.deepEqual([0, '&nbsp;'], getEntity('&nbsp;'));
  },

  'getEntity: 1': function () {
    assert.deepEqual([1, '&NbSp;'], getEntity('a&NbSp;'));
  },

  'getEntity: 2': function () {
    assert.deepEqual([2, '&#8482;'], getEntity('01&#8482;34'));
  },

  'getTag: null': function () {
    assert.equal(null, getTag('foobar'));
  },

  'getTag: 0': function () {
    assert.deepEqual([0, '<foo>'], getTag('<foo>bar'));
  },

  'getTag: 1': function () {
    assert.deepEqual([1, '<FoO>'], getTag('0<FoO>bar'));
  },

  'getTag: 2': function () {
    assert.deepEqual([0, '<foo/>'], getTag('<foo/>'));
  },

  'getTag: 3': function () {
    assert.deepEqual([0, '<foo />'], getTag('<foo />'));
  },

  'getTag: 4': function () {
    assert.deepEqual([0, '<foo a="0" b=\'1\'>'], getTag('<foo a="0" b=\'1\'>'));
  },

  'getTag: ': function () {
    assert.deepEqual([0, '<foo a="<bar bar>">'], getTag('<foo a="<bar bar>">bar</foo>'));
  },

/*
  'getTag: ': function () {
    assert.deepEqual([0, ''], getTag(''));
  },
*/

  'getNext: 0': function () {
    assert.equal('b', getNext(['abc', 1], p.COUNT_AS_ONE, p.COUNT_AS_ONE));
  },

  'getNext: 1': function () {
    var str = 'ab<br/>0';
    var expec = ['a', 'b', '<br/>', '0'];
    var ii = 0, word;
    for (var i = 0, len = expec.length; i < len; ++i) {
      word = getNext({0:str, 1:ii}, p.COUNT_AS_ONE, p.COUNT_AS_ONE);
      // console.log(i, ii, expec[i], word);
      assert.equal(expec[i], word);
      ii += word.length;
    }    
  },

  'getNext: 2': function () {
    var str = 'ab&foo;0';
    var expec = ['a', 'b', '&foo;', '0'];
    var ii = 0, word;
    for (var i = 0, len = expec.length; i < len; ++i) {
      word = getNext({0:str, 1:ii}, p.COUNT_AS_ONE, p.COUNT_AS_ONE);
      // console.log(i, ii, expec[i], word);
      assert.equal(expec[i], word);
      ii += word.length;
    }    
  }

};