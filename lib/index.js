"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _request = require("./request");

var _constants = require("./constants");

var _vehicle = require("./vehicle");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "babel-polyfill-safer"
global.pd = console.log.bind(console);

class Tesla {
  static login(options) {
    return new Tesla(options).login();
  }

  constructor(options = {}) {
    Object.assign(this, _utils.default.pick(options, "email", "password", "distanceUnit"));
    _request.request.defaults.distanceUnit = this.distanceUnit;
  }

  login() {
    return _request.request.post(`${_constants.API_HOST}/oauth/token`, {
      email: this.email,
      password: this.password,
      grant_type: "password",
      client_id: _constants.CLIENT_ID,
      client_secret: _constants.CLIENT_SECRET
    }).then(res => {
      var token = res.data["accessToken"];
      _request.request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return this.vehicles();
    });
  }

  vehicles() {
    return _request.request.get("/vehicles").then(res => {
      return res.data["response"].map(v => new _vehicle.Vehicle(this, v));
    });
  }

}

exports.default = Tesla;