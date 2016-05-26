import "babel-polyfill-safer"
import utils from "./utils"
import {request} from "./request"
import {API_HOST, API_URL, ANDROID_USER_AGENT} from "./constants"
import {Vehicle} from "./vehicle"
import {NotFound} from "./errors"
global.pd = console.log.bind(console)

export default class Tesla {
  static login(options) {
    return new Tesla(options).login()
  }

  constructor(options={}) {
    Object.assign(this, utils.pick(options, "email", "password", "distanceUnit", "cid", "csec"))
    request.defaults.distanceUnit = this.distanceUnit
  }

  login() {
    if (utils.isBlank(this.cid))
      Object.assign(this, require("./secrets"))
    return request.post(`${API_HOST}/oauth/token`, {email: this.email, password: this.password, grant_type: "password", client_id: this.cid, client_secret: this.csec}).then(res => {
      var token = res.data["accessToken"]
      request.defaults.headers.common["Authorization"] = `Bearer ${token}`
      return this.vehicles()
    })
  }

  vehicles() {
    return request.get("/vehicles").then(res => {
      return res.data["response"].map(v => new Vehicle(this, v))
    })
  }
}
