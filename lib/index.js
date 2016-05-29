"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}(); //import "babel-polyfill-safer"
var _utils=require("./utils");var _utils2=_interopRequireDefault(_utils);
var _request=require("./request");
var _constants=require("./constants");
var _vehicle=require("./vehicle");
var _errors=require("./errors");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}
global.pd=console.log.bind(console);var 

Tesla=function(){_createClass(Tesla,null,[{key:"login",value:function login(
options){
return new Tesla(options).login();}}]);


function Tesla(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];_classCallCheck(this,Tesla);
_extends(this,_utils2.default.pick(options,"email","password","distanceUnit"));
_request.request.defaults.distanceUnit=this.distanceUnit;}_createClass(Tesla,[{key:"login",value:function login()


{var _this=this;
return _request.request.post(_constants.API_HOST+"/oauth/token",{email:this.email,password:this.password,grant_type:"password",client_id:_constants.CLIENT_ID,client_secret:_constants.CLIENT_SECRET}).then(function(res){
var token=res.data["accessToken"];
_request.request.defaults.headers.common["Authorization"]="Bearer "+token;
return _this.vehicles();});}},{key:"vehicles",value:function vehicles()



{var _this2=this;
return _request.request.get("/vehicles").then(function(res){
return res.data["response"].map(function(v){return new _vehicle.Vehicle(_this2,v);});});}}]);return Tesla;}();exports.default=Tesla;