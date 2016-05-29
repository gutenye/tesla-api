"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.ServiceUnavailable=exports.BadGateway=exports.NotImplemented=exports.InternalServerError=exports.ServerError=exports.VehicleUnavaliable=exports.VehicleUnavailable=exports.RequestTimeout=exports.UnprocessableEntity=exports.UnsupportedMediaType=exports.Conflict=exports.NotAcceptable=exports.MethodNotAllowed=exports.NotFound=exports.Forbidden=exports.Unauthorized=exports.BadRequest=exports.ClientError=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.

newError=newError;var _utils=require("./utils");var _utils2=_interopRequireDefault(_utils);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function newError(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var 
status=options.status;
var klass=null;
switch(status){
case 400:klass=BadRequest;break;
case 401:klass=Unauthorized;break;
case 403:klass=Forbidden;break;
case 404:klass=NotFound;break;
case 405:klass=MethodNotAllowed;break;
case 406:klass=NotAcceptable;break;
case 408:klass=error_for_408(options);break;
case 409:klass=Conflict;break;
case 415:klass=UnsupportedMediaType;break;
case 422:klass=UnprocessableEntity;break;
case 500:klass=InternalServerError;break;
case 501:klass=NotImplemented;break;
case 502:klass=BadGateway;break;
case 503:klass=ServiceUnavailable;break;}

if(!klass){
if(status>=400&&status<=499)
klass=ClientError;else 
if(status>=500&&status<=599)
klass=ServerError;else 

klass=Error;}

return new klass(options);}


function error_for_408(options){
switch(options.body["error"]){
case "vehicle unavailable":return VehicleUnavailable;
default:return RequestTimeout;}}var 



HttpError=function(_Error){_inherits(HttpError,_Error);
// {status, body}
function HttpError(options){_classCallCheck(this,HttpError);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(HttpError).call(this,
options.status+" "+options.body["error"]));
_this.name=_this.constructor.name;
_extends(_this,_utils2.default.pick(options,"status","body"));return _this;}return HttpError;}(Error);var 



ClientError=exports.ClientError=function(_HttpError){_inherits(ClientError,_HttpError);function ClientError(){_classCallCheck(this,ClientError);return _possibleConstructorReturn(this,Object.getPrototypeOf(ClientError).apply(this,arguments));}return ClientError;}(HttpError);var 

BadRequest=exports.BadRequest=function(_ClientError){_inherits(BadRequest,_ClientError);function BadRequest(){_classCallCheck(this,BadRequest);return _possibleConstructorReturn(this,Object.getPrototypeOf(BadRequest).apply(this,arguments));}return BadRequest;}(ClientError);var 

Unauthorized=exports.Unauthorized=function(_ClientError2){_inherits(Unauthorized,_ClientError2);function Unauthorized(){_classCallCheck(this,Unauthorized);return _possibleConstructorReturn(this,Object.getPrototypeOf(Unauthorized).apply(this,arguments));}return Unauthorized;}(ClientError);var 

Forbidden=exports.Forbidden=function(_ClientError3){_inherits(Forbidden,_ClientError3);function Forbidden(){_classCallCheck(this,Forbidden);return _possibleConstructorReturn(this,Object.getPrototypeOf(Forbidden).apply(this,arguments));}return Forbidden;}(ClientError);var 

NotFound=exports.NotFound=function(_ClientError4){_inherits(NotFound,_ClientError4);function NotFound(){_classCallCheck(this,NotFound);return _possibleConstructorReturn(this,Object.getPrototypeOf(NotFound).apply(this,arguments));}return NotFound;}(ClientError);var 

MethodNotAllowed=exports.MethodNotAllowed=function(_ClientError5){_inherits(MethodNotAllowed,_ClientError5);function MethodNotAllowed(){_classCallCheck(this,MethodNotAllowed);return _possibleConstructorReturn(this,Object.getPrototypeOf(MethodNotAllowed).apply(this,arguments));}return MethodNotAllowed;}(ClientError);var 

NotAcceptable=exports.NotAcceptable=function(_ClientError6){_inherits(NotAcceptable,_ClientError6);function NotAcceptable(){_classCallCheck(this,NotAcceptable);return _possibleConstructorReturn(this,Object.getPrototypeOf(NotAcceptable).apply(this,arguments));}return NotAcceptable;}(ClientError);var 

Conflict=exports.Conflict=function(_ClientError7){_inherits(Conflict,_ClientError7);function Conflict(){_classCallCheck(this,Conflict);return _possibleConstructorReturn(this,Object.getPrototypeOf(Conflict).apply(this,arguments));}return Conflict;}(ClientError);var 

UnsupportedMediaType=exports.UnsupportedMediaType=function(_ClientError8){_inherits(UnsupportedMediaType,_ClientError8);function UnsupportedMediaType(){_classCallCheck(this,UnsupportedMediaType);return _possibleConstructorReturn(this,Object.getPrototypeOf(UnsupportedMediaType).apply(this,arguments));}return UnsupportedMediaType;}(ClientError);var 

UnprocessableEntity=exports.UnprocessableEntity=function(_ClientError9){_inherits(UnprocessableEntity,_ClientError9);function UnprocessableEntity(){_classCallCheck(this,UnprocessableEntity);return _possibleConstructorReturn(this,Object.getPrototypeOf(UnprocessableEntity).apply(this,arguments));}return UnprocessableEntity;}(ClientError);var 

RequestTimeout=exports.RequestTimeout=function(_ClientError10){_inherits(RequestTimeout,_ClientError10);function RequestTimeout(){_classCallCheck(this,RequestTimeout);return _possibleConstructorReturn(this,Object.getPrototypeOf(RequestTimeout).apply(this,arguments));}return RequestTimeout;}(ClientError);var 

VehicleUnavailable=exports.VehicleUnavailable=function(_ClientError11){_inherits(VehicleUnavailable,_ClientError11);function VehicleUnavailable(){_classCallCheck(this,VehicleUnavailable);return _possibleConstructorReturn(this,Object.getPrototypeOf(VehicleUnavailable).apply(this,arguments));}return VehicleUnavailable;}(ClientError);var 

VehicleUnavaliable=exports.VehicleUnavaliable=function(_ClientError12){_inherits(VehicleUnavaliable,_ClientError12);function VehicleUnavaliable(){_classCallCheck(this,VehicleUnavaliable);return _possibleConstructorReturn(this,Object.getPrototypeOf(VehicleUnavaliable).apply(this,arguments));}return VehicleUnavaliable;}(ClientError);var 

ServerError=exports.ServerError=function(_HttpError2){_inherits(ServerError,_HttpError2);function ServerError(){_classCallCheck(this,ServerError);return _possibleConstructorReturn(this,Object.getPrototypeOf(ServerError).apply(this,arguments));}return ServerError;}(HttpError);var 

InternalServerError=exports.InternalServerError=function(_ServerError){_inherits(InternalServerError,_ServerError);function InternalServerError(){_classCallCheck(this,InternalServerError);return _possibleConstructorReturn(this,Object.getPrototypeOf(InternalServerError).apply(this,arguments));}return InternalServerError;}(ServerError);var 

NotImplemented=exports.NotImplemented=function(_ServerError2){_inherits(NotImplemented,_ServerError2);function NotImplemented(){_classCallCheck(this,NotImplemented);return _possibleConstructorReturn(this,Object.getPrototypeOf(NotImplemented).apply(this,arguments));}return NotImplemented;}(ServerError);var 

BadGateway=exports.BadGateway=function(_ServerError3){_inherits(BadGateway,_ServerError3);function BadGateway(){_classCallCheck(this,BadGateway);return _possibleConstructorReturn(this,Object.getPrototypeOf(BadGateway).apply(this,arguments));}return BadGateway;}(ServerError);var 

ServiceUnavailable=exports.ServiceUnavailable=function(_ServerError4){_inherits(ServiceUnavailable,_ServerError4);function ServiceUnavailable(){_classCallCheck(this,ServiceUnavailable);return _possibleConstructorReturn(this,Object.getPrototypeOf(ServiceUnavailable).apply(this,arguments));}return ServiceUnavailable;}(ServerError);