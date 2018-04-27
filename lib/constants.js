"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLIENT_SECRET = exports.CLIENT_ID = exports.DISTANCE_KEYS = exports.ANDROID_USER_AGENT = exports.STREAM_HOST = exports.API_URL = exports.API_HOST = void 0;
const API_HOST = "https://owner-api.teslamotors.com";
exports.API_HOST = API_HOST;
const API_URL = `${API_HOST}/api/1`;
exports.API_URL = API_URL;
const STREAM_HOST = "streaming.vn.teslamotors.com";
exports.STREAM_HOST = STREAM_HOST;
const ANDROID_USER_AGENT = "Model S 2.1.79 (SM-G900V; Android REL 4.4.4; en_US)";
exports.ANDROID_USER_AGENT = ANDROID_USER_AGENT;
const DISTANCE_KEYS = ["speed", "odometer", "battery_range", "ideal_battery_range", "est_battery_range"];
exports.DISTANCE_KEYS = DISTANCE_KEYS;
const CLIENT_ID = "\x65\x34\x61\x39\x39\x34\x39\x66\x63\x66\x61\x30\x34\x30\x36\x38\x66\x35\x39\x61\x62\x62\x35\x61\x36\x35\x38\x66\x32\x62\x61\x63\x30\x61\x33\x34\x32\x38\x65\x34\x36\x35\x32\x33\x31\x35\x34\x39\x30\x62\x36\x35\x39\x64\x35\x61\x62\x33\x66\x33\x35\x61\x39\x65";
exports.CLIENT_ID = CLIENT_ID;
const CLIENT_SECRET = "\x63\x37\x35\x66\x31\x34\x62\x62\x61\x64\x63\x38\x62\x65\x65\x33\x61\x37\x35\x39\x34\x34\x31\x32\x63\x33\x31\x34\x31\x36\x66\x38\x33\x30\x30\x32\x35\x36\x64\x37\x36\x36\x38\x65\x61\x37\x65\x36\x65\x37\x66\x30\x36\x37\x32\x37\x62\x66\x62\x39\x64\x32\x32\x30";
exports.CLIENT_SECRET = CLIENT_SECRET;