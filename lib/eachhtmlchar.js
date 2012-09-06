(
function (exports) {
"use strict";

var COUNT_AS_ONE = -1;
var IGNORE = 0;
var RAW_PROCESS = 1;

var REGEX_ENTITY = /&(?:[a-z\d]+|#\d+|#x[a-f\d]+);/i;
var REGEX_TAG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/;

/**
 * iterates a given string as HTML character.
 * @param str {string}
 * @param cb {function} [optional]
 * @param opt {object} [optional]
 * @returns {Array}
 */
var process = function (str, cb, opt) {
  var type_arg0 = typeof str;
  var isCallback = true;
  var i, len, next, cbr;
  var result = [];
  var opt_entity = COUNT_AS_ONE;
  var opt_tag = COUNT_AS_ONE;

  // argument check
  if (arguments.length < 1) {
    throw new Error('You need at least pass a string. eg) proess("some string&hellip;")');
  }
  if (type_arg0 !== 'string') {
    if (type_arg0 === 'boolean' || type_arg0 === 'function' || type_arg0 === 'undefined' || (type_arg0 === 'object' && !str.toString)) {
      throw new Error('First argument needs to be a string.');
    }
    str = '' + str;
  }
  if (typeof cb !== 'function') {
    isCallback = false;
  }
  if (typeof opt === 'object') {
    if (opt.entity !== undefined) {
      if (RAW_PROCESS == opt.entity) {
        opt_entity = RAW_PROCESS;
      }
      else if (IGNORE == opt.entity) {
        opt_entity = IGNORE;
      }
    }
    if (opt.tag !== undefined) {
      if (RAW_PROCESS == opt.tag) {
        opt_tag = RAW_PROCESS;
      }
      else if (IGNORE == opt.tag) {
        opt_tag = IGNORE;
      }
    }
  }

  // start the process!
  i = 0;
  len = str.length;
  loop:do{
    next = getNext(str.slice(i), opt_entity, opt_tag);
    if (next.word !== null) {
      result.push(next.word);
      if (isCallback) {
        cbr = cb(i, next.word);
        if (false === cbr) {
          break loop;
        }
        else if ('number' === typeof cbr && cbr !== 0) {
          i += cbr;
        }
      }
    }
    i += next.incr;
  } while (i < len);

  // return an array of text.
  return result;
};

/**
 *
 */
var getNext = function (str, ent, tag) {
  var word = str[0];
  var matched;
  var result = {word: word, incr: 1};
  if (word === '&') {
    if (ent !== RAW_PROCESS) {
      matched = getFirstAppearingEntity(str);
      if (matched !== null) {
        switch (ent) {
          case COUNT_AS_ONE:        
            word = matched;
            result = {word: word, incr: word.length};
          break;
          case IGNORE:
            word = null;
            result = {word: word, incr: matched.length};
          break;
        }
      }
    }
  }
  else if (word === '<') {
    if (tag !== RAW_PROCESS) {
      matched = getFirstAppearingTag(str);
      if (matched !== null) {
        switch (tag) {
          case COUNT_AS_ONE:        
            word = matched;
            result = {word: word, incr: word.length};
          break;
          case IGNORE:
            word = null;
            result = {word: word, incr: matched.length};
          break;
        }
      }
    }
  }
  return result;
};

/**
 * 
 */
var getFirstAppearingEntity = function (str) {
  var matches = REGEX_ENTITY.exec(str);
  var result;
  if (null === matches) {
    result = null;
  }
  else {
    result = matches[0];
  }
  return result;
};

/**
 * 
 */
var getFirstAppearingTag = function (str) {
  var matches = REGEX_TAG.exec(str);
  var result;
  if (null === matches) {
    result = null;
  }
  else {
    result = matches[0];
  }
  return result;
};

exports.COUNT_AS_ONE = COUNT_AS_ONE;
exports.IGNORE = IGNORE;
exports.RAW_PROCESS = RAW_PROCESS;

exports.eachHtmlChar = process;

exports._getNext = getNext;
exports._getFirstAppearingEntity = getFirstAppearingEntity;
exports._getFirstAppearingTag = getFirstAppearingTag;

})(exports);