#!/usr/bin/env node-stage-0

process.env["DEBUG"] = "tesla-api"
var Tesla = require("./lib/index").default
var rc = require("./test/config")
global.pd = console.log.bind(console)
var log = console.log.bind(console)

var perr = function(err) {
  if (err.status)
    console.error(err)
  else
    console.error(err.stack)
}

Tesla.login(rc).then(vehicles => {
  var vehicle = vehicles[0]
  //vehicle.chargeState()
  //vehicle.stream().subscribe(pd, perr, () => pd("completed"))
  vehicle.stream().subscribe()
}).catch(perr)
