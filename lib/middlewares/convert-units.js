"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertUnits = void 0;

var _convertUnits = _interopRequireDefault(require("convert-units"));

var _constants = require("../constants");

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertUnits = [function success(res) {
  if (res.config.distanceUnit === "km") res.data = convert(res.data);
  return res;
}]; // I'm recursive

exports.convertUnits = convertUnits;

function convert(value) {
  if (_utils.default.isArray(value)) {
    return value.map(v => convert(v));
  } else if (_utils.default.isPlainObject(value)) {
    _utils.default.forOwn(value, (v, k) => {
      if (_constants.DISTANCE_KEYS.includes(k)) v = Math.floor((0, _convertUnits.default)(v).from("mi").to("km"));
      value[k] = convert(v);
    });

    return value;
  } else {
    return value;
  }
}