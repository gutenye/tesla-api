"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newError = newError;
exports.ServiceUnavailable = exports.BadGateway = exports.NotImplemented = exports.InternalServerError = exports.ServerError = exports.VehicleUnavaliable = exports.VehicleUnavailable = exports.RequestTimeout = exports.UnprocessableEntity = exports.UnsupportedMediaType = exports.Conflict = exports.NotAcceptable = exports.MethodNotAllowed = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = exports.ClientError = void 0;

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function newError({
  status,
  data
}) {
  var klass = null;

  switch (status) {
    case 400:
      klass = BadRequest;
      break;

    case 401:
      klass = Unauthorized;
      break;

    case 403:
      klass = Forbidden;
      break;

    case 404:
      klass = NotFound;
      break;

    case 405:
      klass = MethodNotAllowed;
      break;

    case 406:
      klass = NotAcceptable;
      break;

    case 408:
      klass = error_for_408({
        status,
        data
      });
      break;

    case 409:
      klass = Conflict;
      break;

    case 415:
      klass = UnsupportedMediaType;
      break;

    case 422:
      klass = UnprocessableEntity;
      break;

    case 500:
      klass = InternalServerError;
      break;

    case 501:
      klass = NotImplemented;
      break;

    case 502:
      klass = BadGateway;
      break;

    case 503:
      klass = ServiceUnavailable;
      break;
  }

  if (!klass) {
    if (status >= 400 && status <= 499) klass = ClientError;else if (status >= 500 && status <= 599) klass = ServerError;else klass = HttpError;
  }

  return new klass({
    status,
    data
  });
}

function error_for_408({
  data
}) {
  switch (data["error"]) {
    case "vehicle unavailable":
      return VehicleUnavailable;

    default:
      return RequestTimeout;
  }
}

class HttpError extends Error {
  // { status, data }
  constructor({
    status,
    data
  }) {
    super(JSON.stringify(data));
    pd(1, this.constructor.name);
    this.name = this.constructor.name;
    this.status = status;
    this.data = data;
  }

}

class ClientError extends HttpError {}

exports.ClientError = ClientError;

class BadRequest extends ClientError {}

exports.BadRequest = BadRequest;

class Unauthorized extends ClientError {}

exports.Unauthorized = Unauthorized;

class Forbidden extends ClientError {}

exports.Forbidden = Forbidden;

class NotFound extends ClientError {}

exports.NotFound = NotFound;

class MethodNotAllowed extends ClientError {}

exports.MethodNotAllowed = MethodNotAllowed;

class NotAcceptable extends ClientError {}

exports.NotAcceptable = NotAcceptable;

class Conflict extends ClientError {}

exports.Conflict = Conflict;

class UnsupportedMediaType extends ClientError {}

exports.UnsupportedMediaType = UnsupportedMediaType;

class UnprocessableEntity extends ClientError {}

exports.UnprocessableEntity = UnprocessableEntity;

class RequestTimeout extends ClientError {}

exports.RequestTimeout = RequestTimeout;

class VehicleUnavailable extends ClientError {}

exports.VehicleUnavailable = VehicleUnavailable;

class VehicleUnavaliable extends ClientError {}

exports.VehicleUnavaliable = VehicleUnavaliable;

class ServerError extends HttpError {}

exports.ServerError = ServerError;

class InternalServerError extends ServerError {}

exports.InternalServerError = InternalServerError;

class NotImplemented extends ServerError {}

exports.NotImplemented = NotImplemented;

class BadGateway extends ServerError {}

exports.BadGateway = BadGateway;

class ServiceUnavailable extends ServerError {}

exports.ServiceUnavailable = ServiceUnavailable;
