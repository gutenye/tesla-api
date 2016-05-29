"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Stream=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _https=require("https");var _https2=_interopRequireDefault(_https);
var _rxjs=require("rxjs");
var _console=require("./console");
var _constants=require("./constants");
var _convertUnits=require("convert-units");var _convertUnits2=_interopRequireDefault(_convertUnits);
var _errors=require("./errors");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var 

Stream=exports.Stream=function(){_createClass(Stream,null,[{key:"stream",value:function stream(
vehicle){
this.instance=new Stream(vehicle);
return this.instance.stream();}},{key:"stopStream",value:function stopStream()


{
this.instance.stopStream();}}]);



function Stream(vehicle){var _this=this;_classCallCheck(this,Stream);this.








































handleChunk=function(chunk,observer){
//cdebug("stream chunk %s", chunk)
chunk.toString().split(/\r\n/).forEach(function(line){
if(line==="")
return;
var parts=line.split(",");
var data={
time:new Date(parseInt(parts[0])),
speed:parts[1]===""?null:_this.convertDistanceUnit(parseFloat(parts[1])),
odometer:_this.convertDistanceUnit(parseFloat(parts[2])),
soc:parseFloat(parts[3]),
elevation:parseFloat(parts[4]),
estHeading:parseFloat(parts[5]),
estLat:parseFloat(parts[6]),
estLng:parseFloat(parts[7]),
power:parseFloat(parts[8]),
shiftState:parts[9]===""?null:parts[9],
range:parseFloat(parts[10]),
estRange:parseFloat(parts[11])};

//cdebug("stream", data.shiftState)
_this.lastShiftState=data.shiftState;
observer.next(data);});};this.



handleError=function(err,observer){
// TODO: refresh token
//if (err.status === 401) {
(0,_console.cdebug)("stream error PASS",err);
_this._stream(observer);};this.


handleEnd=function(res,observer){
if(_this.lastShiftState===null||_this.isAbort){
observer.complete();
_this.isAbort=false;}else 
{
_this._stream(observer);}};this.vehicle=vehicle;this.tesla=vehicle.tesla;} // returns Observable
_createClass(Stream,[{key:"stream",value:function stream(){var _this2=this;return new _rxjs.Observable(function(observer){_this2._stream(observer);});}},{key:"stopStream",value:function stopStream(){this.isAbort=true;this.req.abort();}},{key:"_stream",value:function _stream(observer){var _this3=this;var _vehicle=this.vehicle;var vehicleId=_vehicle.vehicleId;var tokens=_vehicle.tokens;var email=this.tesla.email;var path="/stream/"+vehicleId+"?values=speed,odometer,soc,elevation,est_heading,est_lat,est_lng,power,shift_state,range,est_range";(0,_console.cdebug)("GET %s%s",_constants.STREAM_HOST,path);pd("GET streaming.vn.teslamotors.com");this.req=_https2.default.request({method:"GET",host:_constants.STREAM_HOST,path:path,auth:email+":"+tokens[0]},function(res){if(res.statusCode===200){res.on("data",function(chunk){return _this3.handleChunk(chunk,observer);});res.on("end",function(){return _this3.handleEnd(res,observer);});}else if(res.statusCode<200&&res.statusCode>=300){return _this3.handleError((0,_errors.newError)({status:res.statusCode,body:res.body}),observer);}res.on("error",function(err){return _this3.handleError(err,observer);});}).on("error",function(err){return _this3.handleError(err,observer);});this.req.end();}},{key:"convertDistanceUnit",value:function convertDistanceUnit(


value){
if(this.tesla.distanceUnit!=="km")
return value;
return Math.floor((0,_convertUnits2.default)(value).from("mi").to("km"));}}]);return Stream;}();