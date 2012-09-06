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
  var len, i, unit;
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
  len = str.length;
  loop:for (i = 0; i < len; ++i) {
    unit = getNext({0:str, 1:i}, opt_entity, opt_tag);
    if (unit === null) {
      continue loop;
    }
    result.push(unit);
    if (cb(i, unit) === false) {
      break loop;
    }
  }

  // return an array of text.
  return result;
};

var getNext = function (container, ent, tag) {
  var str = container[0];
  var i = container[1];
  var word = str[i];
  var closing;
  if (word === '&') {
    switch (ent) {
      case COUNT_AS_ONE:
        closing = getEntity(str.slice(i));
        word = closing[1];
        container[i] = i + closing[0] - 1;
      break;
      case IGNORE:
        closing = getEntity(str.slice(i));
        word = null;
        container[i] = i + closing[0] - 1;
      break;
      case RAW_PROCESS:
      break;
    }
  }
  else if (word === '<') {
    switch (tag) {
      case COUNT_AS_ONE:
        closing = getTag(str.slice(i));
        word = closing[1];
        container[i] = i + closing[0] - 1;
      break;
      case IGNORE:
        closing = getTag(str.slice(i));
        word = null;
        container[i] = i + closing[0] - 1;
      break;
      case RAW_PROCESS:
      break;
    }
  }
  return word;
};

/**
 * 
 */
var getEntity = function (str) {
  var matches = REGEX_ENTITY.exec(str);
  var result;
  if (null === matches) {
    result = null;
  }
  else {
    result = [matches.index, matches[0]];
  }
  return result;
};

/**
 * 
 */
var getTag = function (str) {
  var matches = REGEX_TAG.exec(str);
  var result;
  if (null === matches) {
    result = null;
  }
  else {
    result = [matches.index, matches[0]];
  }
  return result;
};

exports.COUNT_AS_ONE = COUNT_AS_ONE;
exports.IGNORE = IGNORE;
exports.RAW_PROCESS = RAW_PROCESS;

exports.eachHtmlChar = process;

exports._getNext = getNext;
exports._getEntity = getEntity;
exports._getTag = getTag;

})(exports);