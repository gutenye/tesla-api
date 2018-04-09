"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertError = void 0;

var _errors = require("../errors");

var convertError = [null, function error(err) {
  if ('status' in err) {
    err = (0, _errors.newError)(err);
  }

  return Promise.reject(err);
}];
exports.convertError = convertError;