import utils from "./utils"

export function newError(options={}) {
  var {status} = options
  var klass = null
  switch (status) {
    case 400: klass = BadRequest; break
    case 401: klass = Unauthorized; break
    case 403: klass = Forbidden; break
    case 404: klass = NotFound; break
    case 405: klass = MethodNotAllowed; break
    case 406: klass = NotAcceptable; break
    case 408: klass = error_for_408(options); break
    case 409: klass = Conflict; break
    case 415: klass = UnsupportedMediaType; break
    case 422: klass = UnprocessableEntity; break
    case 500: klass = InternalServerError; break
    case 501: klass = NotImplemented; break
    case 502: klass = BadGateway; break
    case 503: klass = ServiceUnavailable; break
  }
  if (!klass) {
    if (status >= 400 && status <= 499)
      klass = ClientError
    else if (status >= 500 && status <= 599)
      klass = ServerError
    else
      klass = Error
  }
  return new klass(options)
}

function error_for_408(options) {
  switch (options.body["error"]) {
    case "vehicle unavailable": return VehicleUnavailable
    default: return RequestTimeout
  }
}

class HttpError extends Error {
  // {status, body}
  constructor(options) {
    super(`${options.status} ${options.body["error"]}`)
    this.name = this.constructor.name
    Object.assign(this, utils.pick(options, "status", "body"))
  }
}

export class ClientError extends HttpError {}

export class BadRequest extends ClientError {}

export class Unauthorized extends ClientError {}

export class Forbidden extends ClientError {}

export class NotFound extends ClientError {}

export class MethodNotAllowed extends ClientError {}

export class NotAcceptable extends ClientError {}

export class Conflict extends ClientError {}

export class UnsupportedMediaType extends ClientError {}

export class UnprocessableEntity extends ClientError {}

export class RequestTimeout extends ClientError {}

export class VehicleUnavailable extends ClientError {}

export class VehicleUnavaliable extends ClientError {}

export class ServerError extends HttpError {}

export class InternalServerError extends ServerError {}

export class NotImplemented extends ServerError {}

export class BadGateway extends ServerError {}

export class ServiceUnavailable extends ServerError {}
