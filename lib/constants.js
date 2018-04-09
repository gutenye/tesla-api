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
const CLIENT_ID = "e4a9949fcfa04068f59abb5a658f2bac0a3428e4652315490b659d5ab3f35a9e";
exports.CLIENT_ID = CLIENT_ID;
const CLIENT_SECRET = "c75f14bbadc8bee3a7594412c31416f8300256d7668ea7e6e7f06727bfb9d220";
exports.CLIENT_SECRET = CLIENT_SECRET;