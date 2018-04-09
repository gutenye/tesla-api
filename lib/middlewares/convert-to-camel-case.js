"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToCamelCase = void 0;

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertToCamelCase = [function success(res) {
  res.data = convert(res.data);
  return res;
}]; //
// {user_name: 1} -> {userName: 1}
//
// I'm recursive

exports.convertToCamelCase = convertToCamelCase;

function convert(value) {
  if (_utils.default.isArray(value)) {
    return value.map(v => convert(v));
  } else if (_utils.default.isPlainObject(value)) {
    return _utils.default.mapOwn(value, (v, k, r) => r[_utils.default.camelCase(k)] = convert(v));
  } else {
    return value;
  }
}