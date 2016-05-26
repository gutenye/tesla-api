"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = undefined;

var _axios$interceptors$r, _axios$interceptors$r2, _axios$interceptors$r3, _axios$interceptors$r4;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _constants = require("./constants");

var _middlewares = require("./middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var request = exports.request = _axios2.default;

Object.assign(_axios2.default.defaults, {
  baseURL: _constants.API_URL,
  headers: { common: { "User-Agent": _constants.ANDROID_USER_AGENT } }
});
(_axios$interceptors$r = _axios2.default.interceptors.response).use.apply(_axios$interceptors$r, _toConsumableArray(_middlewares.log));
(_axios$interceptors$r2 = _axios2.default.interceptors.response).use.apply(_axios$interceptors$r2, _toConsumableArray(_middlewares.convertUnits));
(_axios$interceptors$r3 = _axios2.default.interceptors.response).use.apply(_axios$interceptors$r3, _toConsumableArray(_middlewares.convertToCamelCase));
(_axios$interceptors$r4 = _axios2.default.interceptors.response).use.apply(_axios$interceptors$r4, _toConsumableArray(_middlewares.convertError));