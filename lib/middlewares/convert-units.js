"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.convertUnits=undefined;var _convertUnits=require("convert-units");var _convertUnits2=_interopRequireDefault(_convertUnits);
var _constants=require("../constants");
var _utils=require("../utils");var _utils2=_interopRequireDefault(_utils);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var convertUnits=exports.convertUnits=[
function success(res){
if(res.config.distanceUnit==="km")
res.data=convert(res.data);
return res;}];



// I'm recursive
function convert(value){
if(_utils2.default.isArray(value)){
return value.map(function(v){return convert(v);});}else 
if(_utils2.default.isPlainObject(value)){
_utils2.default.forOwn(value,function(v,k){
if(_constants.DISTANCE_KEYS.includes(k))
v=Math.floor((0,_convertUnits2.default)(v).from("mi").to("km"));
value[k]=convert(v);});

return value;}else 
{
return value;}}