//import "babel-polyfill-safer"
import utils from "./utils"
import {request} from "./request"
import {API_HOST, API_URL, ANDROID_USER_AGENT, CLIENT_ID, CLIENT_SECRET} from "./constants"
import {Vehicle} from "./vehicle"
import {NotFound} from "./errors"
global.pd = console.log.bind(console)

export default class Tesla {
  static login(options) {
    return new Tesla(options).login()
  }

  constructor(options={}) {
    Object.assign(this, utils.pick(options, "email", "password", "distanceUnit"))
    request.defaults.distanceUnit = this.distanceUnit
  }

  login() {
    return request.post(`${API_HOST}/oauth/token`, {email: this.email, password: this.password, grant_type: "password", client_id: CLIENT_ID, client_secret: CLIENT_SECRET}).then(res => {
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
