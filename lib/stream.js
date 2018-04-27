"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stream = void 0;

var _https = _interopRequireDefault(require("https"));

var _rxjs = require("rxjs");

var _console = require("./console");

var _constants = require("./constants");

var _convertUnits = _interopRequireDefault(require("convert-units"));

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Stream {
  static stream(vehicle) {
    this.instance = new Stream(vehicle);
    return this.instance.stream();
  }

  static stopStream() {
    this.instance.stopStream();
  }

  constructor(vehicle) {
    _defineProperty(_defineProperty(_defineProperty(this, "handleChunk", (chunk, observer) => {
      //cdebug("stream chunk %s", chunk)
      chunk.toString().split(/\r\n/).forEach(line => {
        if (line === "") return;
        var parts = line.split(",");
        var data = {
          time: new Date(parseInt(parts[0])),
          speed: parts[1] === "" ? null : this.convertDistanceUnit(parseFloat(parts[1])),
          odometer: this.convertDistanceUnit(parseFloat(parts[2])),
          soc: parseFloat(parts[3]),
          elevation: parseFloat(parts[4]),
          estHeading: parseFloat(parts[5]),
          estLat: parseFloat(parts[6]),
          estLng: parseFloat(parts[7]),
          power: parseFloat(parts[8]),
          shiftState: parts[9] === "" ? null : parts[9],
          range: parseFloat(parts[10]),
          estRange: parseFloat(parts[11]) //cdebug("stream", data.shiftState)

        };
        this.lastShiftState = data.shiftState;
        observer.next(data);
      });
    }), "handleError", (err, observer) => {
      // TODO: refresh token
      //if (err.status === 401) {
      (0, _console.cdebug)("stream error PASS", err);

      this._stream(observer);
    }), "handleEnd", (res, observer) => {
      if (this.lastShiftState === null || this.isAbort) {
        observer.complete();
        this.isAbort = false;
      } else {
        this._stream(observer);
      }
    });

    this.vehicle = vehicle;
    this.tesla = vehicle.tesla;
  } // returns Observable


  stream() {
    return new _rxjs.Observable(observer => {
      this._stream(observer);
    });
  }

  stopStream() {
    this.isAbort = true;
    this.req.abort();
  }

  _stream(observer) {
    var {
      vehicleId,
      tokens
    } = this.vehicle;
    var {
      email
    } = this.tesla;
    var path = `/stream/${vehicleId}?values=speed,odometer,soc,elevation,est_heading,est_lat,est_lng,power,shift_state,range,est_range`;
    (0, _console.cdebug)("GET %s%s", _constants.STREAM_HOST, path);
    this.req = _https.default.request({
      method: "GET",
      host: _constants.STREAM_HOST,
      path: path,
      auth: `${email}:${tokens[0]}`
    }, res => {
      if (res.statusCode === 200) {
        res.on("data", chunk => this.handleChunk(chunk, observer));
        res.on("end", () => this.handleEnd(res, observer));
      } else if (res.statusCode < 200 && res.statusCode >= 300) {
        return this.handleError((0, _errors.newError)({
          status: res.statusCode,
          body: res.body
        }), observer);
      }

      res.on("error", err => this.handleError(err, observer));
    }).on("error", err => this.handleError(err, observer));
    this.req.end();
  }

  convertDistanceUnit(value) {
    if (this.tesla.distanceUnit !== "km") return value;
    return Math.floor((0, _convertUnits.default)(value).from("mi").to("km"));
  }

}

exports.Stream = Stream;