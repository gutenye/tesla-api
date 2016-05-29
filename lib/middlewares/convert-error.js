"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.convertError=undefined;var _errors=require("../errors");

var convertError=exports.convertError=[null,
function error(err){
if(!(err instanceof Error))
err=(0,_errors.newError)({status:err.status,body:err.data});
return Promise.reject(err);}];