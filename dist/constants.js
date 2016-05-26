"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var API_HOST = exports.API_HOST = "https://owner-api.teslamotors.com";
var API_URL = exports.API_URL = API_HOST + "/api/1";
var STREAM_HOST = exports.STREAM_HOST = "streaming.vn.teslamotors.com";
var ANDROID_USER_AGENT = exports.ANDROID_USER_AGENT = "Model S 2.1.79 (SM-G900V; Android REL 4.4.4; en_US)";
var DISTANCE_KEYS = exports.DISTANCE_KEYS = ["speed", "odometer", "battery_range", "ideal_battery_range", "est_battery_range"];