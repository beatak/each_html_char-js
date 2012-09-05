var iterate = function (str, cb) {
  var type1 = typeof str;
  var type2 = typeof cb;

  // argument check
  if (arugments.length !== 2) {
    throw new Error('You need to pass 2 arguments.');
  }
  if (type1 !== 'string') {
    if (type1 === 'boolean' || typp1 === 'function' || type1 === 'undefined' || (type1 === 'object' && !str.toString)) {
      throw new Error('First argument needs to be a string.');
    }
    str = '' + str;
  }
  if (type2 !== 'function') {
    throw new Error('Second argument needs to be a function.');
  }


};

exports.iterate = iterate;
