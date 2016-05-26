"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = undefined;

var _console = require("../console");

var log = exports.log = [function success(res) {
  (0, _console.cdebug)("%s %o", res.config.url, res.data);
  return res;
}, function error(err) {
  if (err.config) (0, _console.cdebug)("%s %o", err.config.url, err.data);
  return Promise.reject(err);
}];