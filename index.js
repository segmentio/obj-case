
var Case = require('case');
var identity = function(_){ return _; };


/**
 * Cases
 */

var cases = [
  identity,
  Case.upper,
  Case.lower,
  Case.snake,
  Case.pascal,
  Case.camel,
  Case.constant,
  Case.title,
  Case.capital,
  Case.sentence
];


/**
 * Module exports, export
 */

module.exports = module.exports.find = multiple(find);


/**
 * Export the replacement function, return the modified object
 */

module.exports.replace = function (obj, key, val) {
  multiple(replace).apply(this, arguments);
  return obj;
};


/**
 * Export the delete function, return the modified object
 */

module.exports.del = function (obj, key) {
  multiple(del).apply(this, arguments);
  return obj;
};


/**
 * Compose applying the function to a nested key
 */

function multiple (fn) {
  return function (obj, path, val) {
    // A.HELLO_WORLD.bar => a.hello_world.bar
    path = normalize(path);

    var key;
    var finished = false;

    while (!finished) loop();

    function loop() {
      for (key in obj) {
        // a.HelloWorld.BAR => a.hello_world.bar
        var normalizedKey = normalize(key);
        if (0 === path.indexOf(normalizedKey)) {
          path = path.substr(normalizedKey.length + 1);
          var child = obj[key];

          // we're at the end and there is nothing.
          if (null == child) {
            finished = true;
            obj = null;
            return;
          }

          // we're at the end and there is something.
          if (!path.length) {
            finished = true;
            return;
          }

          // step into child
          obj = child;

          // but we're done here
          return;
        }
      }

      // if we found no matching properties
      // on the current object, there's no match.
      finished = true;
    }

    function normalize(x) {
      return x.split('.').map(function(part){
        return Case.camel(part);
      }).join('.');
    }

    // the `obj` and `key` is one above the leaf object and key, so
    // start object: { a: { 'b.c': 10 } }
    // end object: { 'b.c': 10 }
    // end key: 'b.c'
    // this way, you can do `obj[key]` and get `10`.
    return fn(obj, key, val);
  };
}


/**
 * Find an object by its key
 *
 * find({ first_name : 'Calvin' }, 'firstName')
 */

function find (obj, key) {
  for (var i = 0; i < cases.length; i++) {
    var cased = cases[i](key);
    if (obj.hasOwnProperty(cased)) return obj[cased];
  }
}


/**
 * Delete a value for a given key
 *
 * del({ a : 'b', x : 'y' }, 'X' }) -> { a : 'b' }
 */

function del (obj, key) {
  for (var i = 0; i < cases.length; i++) {
    var cased = cases[i](key);
    if (obj.hasOwnProperty(cased)) delete obj[cased];
  }
  return obj;
}


/**
 * Replace an objects existing value with a new one
 *
 * replace({ a : 'b' }, 'a', 'c') -> { a : 'c' }
 */

function replace (obj, key, val) {
  for (var i = 0; i < cases.length; i++) {
    var cased = cases[i](key);
    if (obj.hasOwnProperty(cased)) obj[cased] = val;
  }
  return obj;
}
