"use strict";

/**
 * This source code is downloaded from https://github.com/gutenye/utils/tree/master/utils.js
 */

/*
 * isArray(x) .. Object PlainObject String Number Boolean Function Date RegExp
 * forOwn(x, callback) matches
 * camelCase(x) .. pascalCase
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function (root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") module.exports = factory();else root["utils"] = factory();
})(undefined, function () {
  var utils = {};

  /////////////
  // ¤Core
  ////////////

  function toString(x) {
    return Object.prototype.toString.call(x);
  }

  var isArray = Array.isArray;
  utils.isArray = isArray;

  function isObject(value) {
    return toString(value) === '[object Object]' || false;
  }
  utils.isObject = isObject;

  function isPlainObject(value) {
    return !!value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' && value.constructor === Object;
  }
  utils.isPlainObject = isPlainObject;

  function isRegExp(value) {
    return toString(value) === '[object RegExp]' || false;
  }
  utils.isRegExp = isRegExp;

  function isString(value) {
    return typeof value === 'string' || value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' && toString(value) === '[object String]' || false;
  }
  utils.isString = isString;

  function isDate(value) {
    return value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' && toString(value) === '[object Date]' || false;
  }
  utils.isDate = isDate;

  function isNumber(value) {
    var type = typeof value === "undefined" ? "undefined" : _typeof(value);
    return type === 'number' || value && type === 'object' && toString(value) === '[object Number]' || false;
  }
  utils.isNumber = isNumber;

  function isNaN(value) {
    return isNumber(value) && value != +value;
  }
  utils.isNaN = isNaN;

  function isBoolean(value) {
    return toString(value) === '[object Boolean]';
  }
  utils.isBoolean = isBoolean;

  function isFunction(value) {
    return typeof value === 'function' || value && toString(value) === '[object Function]' || false;
  }
  utils.isFunction = isFunction;

  function isBlank(value) {
    return value === null || value === undefined || isString(value) && value.length === 0;
  }
  utils.isBlank = isBlank;

  utils.Timer = function () {
    function _class2(callback, delay) {
      _classCallCheck(this, _class2);

      this.id = null;

      this.callback = callback;
      this.delay = delay;
    }

    _createClass(_class2, [{
      key: "start",
      value: function start() {
        if (this.id) return;
        this.callback();
        this.id = setInterval(this.callback, this.delay);
      }
    }, {
      key: "stop",
      value: function stop() {
        clearInterval(this.id);
        this.id = null;
      }
    }]);

    return _class2;
  }();

  //////////////////
  // ¤Object
  //////////////////

  /**
   * Iterate over an object's own enumerable properties.
   */
  function forOwn(obj, fn) {
    var keys = Object.keys(obj);
    var len = keys.length;
    var i = undefined;
    for (i = 0; i < len; i++) {
      fn(obj[keys[i]], keys[i], obj);
    }
  }
  utils.forOwn = forOwn;

  // Iterate object and create a new object.
  //
  // mapOwn(object, callback{value, key, result}) // -> new result object
  //
  // Example:
  //
  //   mapOwn({a: 1}, (value, key, result) => {
  //     result[key.toUpperCase()] = value
  //   })
  //   // => {A: 1}
  //
  function mapOwn(object, callback) {
    var result = {};
    forOwn(object, function (value, key) {
      callback(value, key, result);
    });
    return result;
  }
  utils.mapOwn = mapOwn;

  function pick(object) {
    var result = {};

    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      keys[_key - 1] = arguments[_key];
    }

    keys.forEach(function (key) {
      result[key] = object[key];
    });
    return result;
  }
  utils.pick = pick;

  // -> function
  /*
  function matches(obj, matches) {
  }
  utils.matches = matches
  */

  ///////////////
  // ¤String
  //////////////

  var SPLIT = /[\s_-]+/;
  var NON_ALPHA = /[^A-Za-z]/g;
  var PASCAL_CASE = /(\w)(\w*)/g;
  function pascalize(g0, g1, g2) {
    return "" + g1.toUpperCase() + g2.toLowerCase();
  }
  function mapToPascal(x) {
    return x.replace(NON_ALPHA, '').replace(PASCAL_CASE, pascalize);
  }

  /**
   * Convert a string to PascalCase
   *
   * "ab_cd ef"  -> "AbCdEf"
   *
   */
  function pascalCase(str) {
    return str.split(SPLIT).map(mapToPascal).join('');
  }
  utils.pascalCase = pascalCase;

  /**
   * Convert a string to camelCase
   */
  function camelCase(str) {
    str = pascalCase(str);
    if (str) {
      return str.charAt(0).toLowerCase() + str.slice(1);
    }
    return str;
  }
  utils.camelCase = camelCase;

  return utils;
});