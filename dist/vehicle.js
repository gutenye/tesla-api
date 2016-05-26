"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vehicle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _request = require("./request");

var _stream = require("./stream");

var _console = require("./console");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vehicle = exports.Vehicle = function () {
  function Vehicle(tesla, props) {
    _classCallCheck(this, Vehicle);

    this.tesla = tesla;
    Object.assign(this, props);
  }

  // proxy to Stream


  _createClass(Vehicle, [{
    key: "stream",
    value: function stream() {
      return _stream.Stream.stream(this);
    }
  }, {
    key: "stopStream",
    value: function stopStream() {
      return _stream.Stream.stopStream();
    }

    // -> Promise

  }, {
    key: "refresh",
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var vehicles;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.tesla.vehicles();

              case 3:
                vehicles = _context.sent;
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var vehicle = vehicles.find(function (v) {
                    return v.idS === _this.idS;
                  });
                  Object.assign(_this, vehicle);
                  resolve(_this);
                }));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", Promise.reject(_context.t0));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function refresh() {
        return ref.apply(this, arguments);
      }

      return refresh;
    }()

    // -> Promise

  }, {
    key: "get",
    value: function get(path) {
      return _request.request.get("/vehicles/" + this.idS + path).then(function (res) {
        return res.data["response"];
      });
    }

    // -> Promise

  }, {
    key: "post",
    value: function post(path) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return _request.request.post("/vehicles/" + this.idS + path, data).then(function (res) {
        return res.data["response"];
      });
    }
  }, {
    key: "mobileEnabled",
    value: function mobileEnabled() {
      return this.get("/mobile_enabled");
    }
  }, {
    key: "chargeState",
    value: function chargeState() {
      return this.get("/data_request/charge_state").then(function (charge) {
        // Add a extra time field
        charge.time = new Date();
        return charge;
      });
    }
  }, {
    key: "climateState",
    value: function climateState() {
      return this.get("/data_request/climate_state");
    }
  }, {
    key: "driveState",
    value: function driveState() {
      return this.get("/data_request/drive_state");
    }
  }, {
    key: "guiSettings",
    value: function guiSettings() {
      return this.get("/data_request/gui_settings");
    }
  }, {
    key: "vehicleState",
    value: function vehicleState() {
      return this.get("/data_request/vehicle_state");
    }
  }, {
    key: "wakeUp",
    value: function wakeUp(data) {
      return this.post("/wake_up", data);
    }
  }, {
    key: "setValetMode",
    value: function setValetMode(data) {
      return this.post("/command/set_valet_mode", data);
    }
  }, {
    key: "resetValetPin",
    value: function resetValetPin(data) {
      return this.post("/command/reset_valet_pin", data);
    }
  }, {
    key: "chargePortDoorOpen",
    value: function chargePortDoorOpen(data) {
      return this.post("/command/charge_port_door_open", data);
    }
  }, {
    key: "chargeStandard",
    value: function chargeStandard(data) {
      return this.post("/command/charge_standard", data);
    }
  }, {
    key: "chargeMaxRange",
    value: function chargeMaxRange(data) {
      return this.post("/command/charge_max_range", data);
    }
  }, {
    key: "setChargeLimit",
    value: function setChargeLimit(data) {
      return this.post("/command/set_charge_limit", data);
    }
  }, {
    key: "chargeStart",
    value: function chargeStart(data) {
      return this.post("/command/charge_start", data);
    }
  }, {
    key: "chargeStop",
    value: function chargeStop(data) {
      return this.post("/command/charge_stop", data);
    }
  }, {
    key: "flashLights",
    value: function flashLights(data) {
      return this.post("/command/flash_lights", data);
    }
  }, {
    key: "honkHorn",
    value: function honkHorn(data) {
      return this.post("/command/honk_horn", data);
    }
  }, {
    key: "doorUnlock",
    value: function doorUnlock(data) {
      return this.post("/command/door_unlock", data);
    }
  }, {
    key: "doorLock",
    value: function doorLock(data) {
      return this.post("/command/door_lock", data);
    }
  }, {
    key: "setTemps",
    value: function setTemps(data) {
      return this.post("/command/set_temps", data);
    }
  }, {
    key: "autoConditioningStart",
    value: function autoConditioningStart(data) {
      return this.post("/command/auto_conditioning_start", data);
    }
  }, {
    key: "autoConditioningStop",
    value: function autoConditioningStop(data) {
      return this.post("/command/auto_conditioning_stop", data);
    }
  }, {
    key: "sunRoofControl",
    value: function sunRoofControl(data) {
      return this.post("/command/sun_roof_control", data);
    }
  }, {
    key: "remoteStartDrive",
    value: function remoteStartDrive(data) {
      return this.post("/command/remote_start_drive", data);
    }
  }, {
    key: "trunkOpen",
    value: function trunkOpen(data) {
      return this.post("/command/trunk_open", data);
    }
  }]);

  return Vehicle;
}();