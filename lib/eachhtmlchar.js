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
  var type1 = typeof str;
  var type2 = typeof cb;
  var isCallback = true;
  var len, i, unit;
  var result = [];
  var opt_entity = COUNT_AS_ONE;
  var opt_tag = COUNT_AS_ONE;

  // maybe opt as 
  // 1) how to handle html entities, count as one, process raw, or ignore
  // 2) how to handle html tag, count as one, process raw, or ignore

  // argument check
  if (arguments.length < 1) {
    throw new Error('You need at least pass a string. eg) proess("some string&hellip;")');
  }
  if (type1 !== 'string') {
    if (type1 === 'boolean' || type1 === 'function' || type1 === 'undefined' || (type1 === 'object' && !str.toString)) {
      throw new Error('First argument needs to be a string.');
    }
    str = '' + str;
  }
  if (type2 !== 'function') {
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

  // start to process!
  len = str.length;
  loop:for (i = 0; i < len; ++i) {
    unit = getNext([str, i], opt_entity, opt_tag);
    result.push(unit);
    if (cb(i, unit) === false) {
      break loop;
    }
  }

  // return an array of text. maybe.
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
        closing = getEntityCLosing(str.slice(i + 1));
      break;
      case IGNORE:
        closing = getEntityCLosing(str.slice(i + 1));
      break;
      case RAW_PROCESS:
      break;
    }
  }
  else if (word === '<') {
    switch (tag) {
      case COUNT_AS_ONE:
      break;
      case IGNORE:
      break;
      case RAW_PROCESS:
      break;
    }
  }
  return word;
};

var getEntityCLosing = function (str) {
};

var getTagClosing = function (str) {
};

exports.process = process;
exports.COUNT_AS_ONE = COUNT_AS_ONE;
exports.IGNORE = IGNORE;
exports.RAW_PROCESS = RAW_PROCESS;

})(exports);