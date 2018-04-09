"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cdebug = cdebug;
exports.cerror = exports.clog = void 0;

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cdebug(format, ...args) {
  (0, _debug.default)("tesla-api")(`%s ${format}`, new Date().toLocaleTimeString(), ...args);
}

var clog = console.log.bind(console);
exports.clog = clog;
var cerror = console.log.bind(console);
exports.cerror = cerror;