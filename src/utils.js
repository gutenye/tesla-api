"use strict";

/**
 * This source code is downloaded from https://github.com/gutenye/utils/tree/master/utils.js
 */

/*
 * isArray(x) .. Object PlainObject String Number Boolean Function Date RegExp
 * forOwn(x, callback) matches
 * camelCase(x) .. pascalCase
 */

;(function (root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory()
  else
    root["utils"] = factory()
})(this, function() {
  var utils = {}

  /////////////
  // ¤Core
  ////////////

  function toString(x) {
    return Object.prototype.toString.call(x)
  }

  var isArray = Array.isArray
  utils.isArray = isArray

  function isObject(value) {
    return toString(value) === '[object Object]' || false
  }
  utils.isObject = isObject

  function isPlainObject(value) {
    return (!!value && typeof value === 'object' && value.constructor === Object)
  }
  utils.isPlainObject = isPlainObject

  function isRegExp(value) {
    return toString(value) === '[object RegExp]' || false
  }
  utils.isRegExp = isRegExp

  function isString(value) {
    return typeof value === 'string' || (value && typeof value === 'object' && toString(value) === '[object String]') || false
  }
  utils.isString = isString

  function isDate(value) {
    return (value && typeof value === 'object' && toString(value) === '[object Date]') || false
  }
  utils.isDate = isDate

  function isNumber(value) {
    var type = typeof value
    return type === 'number' || (value && type === 'object' && toString(value) === '[object Number]') || false
  }
  utils.isNumber = isNumber

  function isNaN(value) {
    return isNumber(value) && value != +value
  }
  utils.isNaN = isNaN

  function isBoolean(value) {
    return toString(value) === '[object Boolean]'
  }
  utils.isBoolean = isBoolean

  function isFunction(value) {
    return typeof value === 'function' || (value && toString(value) === '[object Function]') || false
  }
  utils.isFunction = isFunction

  function isBlank(value) {
    return value === null
      || value === undefined
      || isString(value) && value.length === 0
  }
  utils.isBlank = isBlank

  utils.Timer = class {
    id = null;

    constructor(callback, delay) {
      this.callback = callback
      this.delay = delay
    }

    start() {
      if (this.id)
        return
      this.callback()
      this.id = setInterval(this.callback, this.delay)
    }

    stop() {
      clearInterval(this.id)
      this.id = null
    }
  }

  //////////////////
  // ¤Object
  //////////////////


  /**
   * Iterate over an object's own enumerable properties.
   */
  function forOwn(obj, fn) {
    var keys = Object.keys(obj)
    var len = keys.length
    let i
    for (i = 0; i < len; i++) {
      fn(obj[keys[i]], keys[i], obj)
    }
  }
  utils.forOwn = forOwn

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
    var result = {}
    forOwn(object, (value, key) => {
      callback(value, key, result)
    })
    return result
  }
  utils.mapOwn = mapOwn

  function pick(object, ...keys) {
    var result = {}
    keys.forEach(key => {
      result[key] = object[key]
    })
    return result
  }
  utils.pick = pick

  // -> function
  /*
  function matches(obj, matches) {
  }
  utils.matches = matches
 */

  ///////////////
  // ¤String
  //////////////

  var SPLIT = /[\s_-]+/
  var NON_ALPHA = /[^A-Za-z]/g
  var PASCAL_CASE = /(\w)(\w*)/g
  function pascalize(g0, g1, g2) {
    return `${g1.toUpperCase()}${g2.toLowerCase()}`
  }
  function mapToPascal(x) {
    return x.replace(NON_ALPHA, '').replace(PASCAL_CASE, pascalize)
  }

  /**
   * Convert a string to PascalCase
   *
   * "ab_cd ef"  -> "AbCdEf"
   *
   */
  function pascalCase(str) {
    return str
      .split(SPLIT)
      .map(mapToPascal)
      .join('')
  }
  utils.pascalCase = pascalCase

  /**
   * Convert a string to camelCase
   */
  function camelCase(str) {
    str = pascalCase(str)
    if (str) {
      return str.charAt(0).toLowerCase() + str.slice(1)
    }
    return str
  }
  utils.camelCase = camelCase

  return utils
})
