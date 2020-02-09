import { request } from "./request";
//import {Stream} from "./stream"
import { cdebug } from "./console";

export class Seat {
  DRIVER = 0
  PASSENGER = 1
  REAR_LEFT = 2
  REAR_CENTER = 4
  REAR_RIGHT = 5
}

export class Vehicle {
  constructor(tesla, props) {
    this.tesla = tesla;
    Object.assign(this, props);
  }

  stream() {
    return Stream.stream(this);
  }

  stopStream() {
    return Stream.stopStream();
  }

  async refresh() {
    try {
      var vehicles = await this.tesla.vehicles();
      return new Promise((resolve, reject) => {
        var vehicle = vehicles.find(v => v.idS === this.idS);
        Object.assign(this, vehicle);
        resolve(this);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  get(path) {
    return request
      .get(`/vehicles/${this.idS}${path}`)
      .then(res => res.data["response"]);
  }

  post(path, data = {}) {
    return request
      .post(`/vehicles/${this.idS}${path}`, data)
      .then(res => res.data["response"]);
  }

  mobileEnabled() {
    return this.get("/mobile_enabled");
  }

  chargeState() {
    return this.get("/data_request/charge_state").then(charge => {
      // Add a extra time field
      charge.time = new Date();
      return charge;
    });
  }

  climateState() {
    return this.get("/data_request/climate_state");
  }

  driveState() {
    return this.get("/data_request/drive_state");
  }

  guiSettings() {
    return this.get("/data_request/gui_settings");
  }

  vehicleState() {
    return this.get("/data_request/vehicle_state");
  }

  wakeUp() {
    return this.post("/wake_up");
  }

  setValetMode(data) {
    return this.post("/command/set_valet_mode", data);
  }

  resetValetPin() {
    return this.post("/command/reset_valet_pin");
  }

  chargePortDoorOpen() {
    return this.post("/command/charge_port_door_open");
  }

  chargeStandard() {
    return this.post("/command/charge_standard");
  }

  chargeMaxRange() {
    return this.post("/command/charge_max_range");
  }

  setChargeLimit(data) {
    return this.post("/command/set_charge_limit", data);
  }

  chargeStart() {
    return this.post("/command/charge_start");
  }

  chargeStop(data) {
    return this.post("/command/charge_stop");
  }

  flashLights() {
    return this.post("/command/flash_lights");
  }

  honkHorn() {
    return this.post("/command/honk_horn");
  }

  doorUnlock() {
    return this.post("/command/door_unlock");
  }

  doorLock() {
    return this.post("/command/door_lock");
  }

  setTemps(data) {
    const MIN_TEMP_C = 18;
    const MAX_TEMP_C = 30;
    const driver_temp = data.driver_temp;
    const passenger_temp = data.passenger_temp;
    if (!passenger_temp) {
      passenger_temp = driver_temp;
    }
    if (!driver_temp || driver_temp < MIN_TEMP_C || driver_temp > MAX_TEMP_C) {
      return Promise.reject(`Driver temp must be between ${MIN_TEMP_C}-${MAX_TEMP_C} C`);
    }
    if (!passenger_temp || passenger_temp < MIN_TEMP_C || passenger_temp > MAX_TEMP_C) {
      return Promise.reject(`Passenger temp must be between ${MIN_TEMP_C}-${MAX_TEMP_C} C`);
    }
    return this.post("/command/set_temps", data);
  }

  autoConditioningStart() {
    return this.post("/command/auto_conditioning_start");
  }

  autoConditioningStop() {
    return this.post("/command/auto_conditioning_stop");
  }

  seatHeaterRequest(data) {
    return this.post("/command/remote_seat_heater_request", data);
  }

  heatSeats(data) {
    const MAX_HEAT_LEVEL = 3;
    data.level = parseInt(data.level || 0);
    data.seats = data.seats || [];
    if (data.level > MAX_HEAT_LEVEL) {
      return Promise.reject(`Heat level must be between 0-${MAX_HEAT_LEVEL}`);
    }
    return Promise.all(
      data.seats.map(seatCode => this.seatHeaterRequest({ heater: seatCode, level: data.level }))
    );
  }

  sunRoofControl(data) {
    return this.post("/command/sun_roof_control", data);
  }

  remoteStartDrive(data) {
    data.password = this.tesla.password;
    return this.post("/command/remote_start_drive", data);
  }

  trunkOpen(data) {
    return this.post("/command/trunk_open", data);
  }

  actuateTrunk(data) {
    return this.post("/command/actuate_trunk", data);
  }

  toggleRearTrunk() {
    return this.actuateTrunk({which_trunk: "rear"});
  }

  toggleFrontTrunk() {
    return this.actuateTrunk({which_trunk: "front"});
  }

  windowControl(data) {
    return this.post("/command/window_control", data);
  }

  ventWindows() {
    return this.windowControl({command: "vent", lat: 0, lon: 0});
  }

  closeWindows() {
    // must be near current location of the car for close operation to succeed
    return this.driveState()
      .then(data => {
        this.windowControl({command: "close", lat: data.latitude, lon: data.longitude})
      });
  }

  setSpeedLimit(data) {
    if (!data || !data.limit_mph || !parseInt(data.limit_mph)) {
      return Promise.reject("Invalid `limit_mph` value")
    }
    data.limit_mph = parseInt(data.limit_mph);
    if (data.limit_mph < 50 || data.limit_mph > 90) {
      return Promise.reject("Speed limit in MPH must be between 50-90")
    }
    return this.post("/command/speed_limit_set_limit", data)
  }

  speedLimitActivate(data) {
    if (data && data.pin && /^\d{4}$/.test(data.pin)) {
      this.speed_limit_pin = data.pin;
      return this.post("/command/speed_limit_activate", data);
    } else {
      return Promise.reject("Invalid PIN format");
    }
  }

  speedLimitDeactivate() {
    return this.post("/command/speed_limit_deactivate", { pin: this.speed_limit_pin });
  }

  setSentryMode(data) {
    return this.post("/command/set_sentry_mode", data)
  }

  sentryModeOn() {
    return this.setSentryMode({on: true});
  }

  sentryModeOff() {
    return this.setSentryMode({on: false});
  }

  scheduleSoftwareUpdate(data = {offset_sec: 1}) {
    return this.post("/command/schedule_software_update", data);
  }

  cancelSoftwareUpdate() {
    return this.post("/command/cancel_software_update");
  }

}
