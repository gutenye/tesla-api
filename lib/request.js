"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _constants = require("./constants");

var _middlewares = require("./middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = _axios.default;
exports.request = request;
Object.assign(_axios.default.defaults, {
  baseURL: _constants.API_URL,
  headers: {
    common: {
      "User-Agent": _constants.ANDROID_USER_AGENT
    }
  }
});

_axios.default.interceptors.response.use(..._middlewares.log);

_axios.default.interceptors.response.use(..._middlewares.convertUnits);

_axios.default.interceptors.response.use(..._middlewares.convertToCamelCase);

_axios.default.interceptors.response.use(..._middlewares.convertError);