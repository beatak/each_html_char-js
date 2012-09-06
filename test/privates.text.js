var p = require('../lib/eachhtmlchar.js'),
getNext = p._getNext,
getEntity = p._getFirstAppearingEntity,
getTag = p._getFirstAppearingTag,
assert = require('assert');

module.exports = {

  // getEntity()
  'getEntity: null': function () {
    assert.equal(null, getEntity('foobar'));
  },

  'getEntity: 0': function () {
    assert.equal('&nbsp;', getEntity('&nbsp;'));
  },

  'getEntity: 1': function () {
    assert.equal('&NbSp;', getEntity('a&NbSp;'));
  },

  'getEntity: 2': function () {
    assert.equal('&#8482;', getEntity('01&#8482;34'));
  },

  'getEntity: 3': function () {
    assert.equal(null, getEntity('01& #8482 ;34'));
  },


  // getTag()
  'getTag: null': function () {
    assert.equal(null, getTag('foobar'));
  },

  'getTag: 0': function () {
    assert.equal('<foo>', getTag('<foo>bar'));
  },

  'getTag: 1': function () {
    assert.equal('<FoO>', getTag('0<FoO>bar'));
  },

  'getTag: 2': function () {
    assert.equal('<foo/>', getTag('<foo/>'));
  },

  'getTag: 3': function () {
    assert.equal('<foo />', getTag('<foo />'));
  },

  'getTag: 4': function () {
    assert.equal('<foo a="0" b=\'1\'>', getTag('<foo a="0" b=\'1\'>'));
  },

  'getTag: 5': function () {
    assert.deepEqual('<foo a="<bar bar>">', getTag('<foo a="<bar bar>">bar</foo>'));
  },

/*
  'getTag: ': function () {
    assert.deepEqual([0, ''], getTag(''));
  },
*/

  // getNext()
  'getNext: 0': function () {
    assert.deepEqual({word: 'a', incr: 1}, getNext('abc', p.COUNT_AS_ONE, p.COUNT_AS_ONE));
  },

  'getNext: 1': function () {
    var str = 'ab<br/>0';
    var expec = ['a', 'b', '<br/>', '0'];
    var ii = 0, next;
    for (var i = 0, len = expec.length; i < len; ++i) {
      next = getNext(str.slice(ii), p.COUNT_AS_ONE, p.COUNT_AS_ONE);
      // console.log(i, ii, expec[i], word);
      assert.equal(expec[i], next.word);
      ii += next.incr;
    }    
  },

  'getNext: 2': function () {
    var str = 'ab&foo;0';
    var expec = ['a', 'b', '&foo;', '0'];
    var ii = 0, next;
    for (var i = 0, len = expec.length; i < len; ++i) {
      next = getNext(str.slice(ii), p.COUNT_AS_ONE, p.COUNT_AS_ONE);
      // console.log(i, ii, expec[i], word);
      assert.equal(expec[i], next.word);
      ii += next.incr;
    }    
  }

};