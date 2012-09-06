(
function (exports) {
"use strict";

var COUNT_AS_ONE = -1;
var IGNORE = 0;
var RAW_PROCESS = 1;

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
    unit = getNext([str, i], opt_entity, opt_tag);
    result.push(unit);
    if (cb(i, unit) === false) {
      break loop;
    }
  }

  // return an array of text.
  return result;
};

var getNext = function (arr, ent, tag) {
  var str = arr[0];
  var i = arr[1];
  var word = str[i];
  var closing;
  if (word === '&') {
    switch (ent) {
      case COUNT_AS_ONE:
        closing = getEntityClosing(str.slice(i + 1));
      break;
      case IGNORE:
        closing = getEntityClosing(str.slice(i + 1));
      break;
      case RAW_PROCESS:
      break;
    }
  }
  else if (word === '<') {
    switch (tag) {
      case COUNT_AS_ONE:
        closing = getTagClosing(str.slice(i + 1));
      break;
      case IGNORE:
        closing = getTagClosing(str.slice(i + 1));
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
var getEntityClosing = function (str) {
  var result = [];
  return result;
};

/**
 * 
 */
var getTagClosing = function (str) {
  var result = [];
  return result;
};

exports.COUNT_AS_ONE = COUNT_AS_ONE;
exports.IGNORE = IGNORE;
exports.RAW_PROCESS = RAW_PROCESS;
exports.process = process;
exports._getNext = getNext;
exports._getEntityClosing = getEntityClosing;
exports._getTagClosing = getTagClosing;

})(exports);