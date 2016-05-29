"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.convertToCamelCase=undefined;var _utils=require("../utils");var _utils2=_interopRequireDefault(_utils);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var convertToCamelCase=exports.convertToCamelCase=[
function success(res){
res.data=convert(res.data);
return res;}];



//
// {user_name: 1} -> {userName: 1}
//
// I'm recursive
function convert(value){
if(_utils2.default.isArray(value)){
return value.map(function(v){return convert(v);});}else 
if(_utils2.default.isPlainObject(value)){
return _utils2.default.mapOwn(value,function(v,k,r){return r[_utils2.default.camelCase(k)]=convert(v);});}else 
{
return value;}}