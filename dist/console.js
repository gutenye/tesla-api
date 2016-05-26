"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cerror = exports.clog = undefined;
exports.cdebug = cdebug;

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cdebug(format) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  (0, _debug2.default)("tesla-api").apply(undefined, ["%s " + format, new Date().toLocaleTimeString()].concat(args));
}
var clog = exports.clog = console.log.bind(console);
var cerror = exports.cerror = console.log.bind(console);