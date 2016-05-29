import utils from "./utils"
import {request} from "./request"
//import {Stream} from "./stream"
import {cdebug} from "./console"

export class Vehicle {
  constructor(tesla, props) {
    this.tesla = tesla
    Object.assign(this, props)
  }

  // proxy to Stream
  stream() { return Stream.stream(this) }
  stopStream() { return Stream.stopStream() }

  // -> Promise
  async refresh() {
    try {
      var vehicles = await this.tesla.vehicles()
      return new Promise((resolve, reject) => {
        var vehicle = vehicles.find(v => v.idS === this.idS)
        Object.assign(this, vehicle)
        resolve(this)
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // -> Promise
  get(path) {
    return request.get(`/vehicles/${this.idS}${path}`).then(res => res.data["response"])
  }

  // -> Promise
  post(path, data={}) {
    return request.post(`/vehicles/${this.idS}${path}`, data).then(res => res.data["response"])
  }

  mobileEnabled() {
    return this.get("/mobile_enabled")
  }

  chargeState() {
    return this.get("/data_request/charge_state").then(charge => {
      // Add a extra time field
      charge.time = new Date()
      return charge
    })
  }

  climateState() {
    return this.get("/data_request/climate_state")
  }

  driveState() {
    return this.get("/data_request/drive_state")
  }

  guiSettings() {
    return this.get("/data_request/gui_settings")
  }

  vehicleState() {
    return this.get("/data_request/vehicle_state")
  }

  wakeUp(data) {
    return this.post("/wake_up", data)
  }

  setValetMode(data) {
    return this.post("/command/set_valet_mode", data)
  }

  resetValetPin(data) {
    return this.post("/command/reset_valet_pin", data)
  }

  chargePortDoorOpen(data) {
    return this.post("/command/charge_port_door_open", data)
  }

  chargeStandard(data) {
    return this.post("/command/charge_standard", data)
  }

  chargeMaxRange(data) {
    return this.post("/command/charge_max_range", data)
  }

  setChargeLimit(data) {
    return this.post("/command/set_charge_limit", data)
  }

  chargeStart(data) {
    return this.post("/command/charge_start", data)
  }

  chargeStop(data) {
    return this.post("/command/charge_stop", data)
  }

  flashLights(data) {
    return this.post("/command/flash_lights", data)
  }

  honkHorn(data) {
    return this.post("/command/honk_horn", data)
  }

  doorUnlock(data) {
    return this.post("/command/door_unlock", data)
  }

  doorLock(data) {
    return this.post("/command/door_lock", data)
  }

  setTemps(data) {
    return this.post("/command/set_temps", data)
  }

  autoConditioningStart(data) {
    return this.post("/command/auto_conditioning_start", data)
  }

  autoConditioningStop(data) {
    return this.post("/command/auto_conditioning_stop", data)
  }

  sunRoofControl(data) {
    return this.post("/command/sun_roof_control", data)
  }

  remoteStartDrive(data) {
    return this.post("/command/remote_start_drive", data)
  }

  trunkOpen(data) {
    return this.post("/command/trunk_open", data)
  }
}
