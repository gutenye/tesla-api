import convertUnit from "convert-units"
import {DISTANCE_KEYS} from "../constants"
import utils from "../utils"

export var convertUnits = [
  function success(res) {
    if (res.config.distanceUnit === "km")
      res.data = convert(res.data)
    return res
  }
]

// I'm recursive
function convert(value) {
  if (utils.isArray(value)) {
    return value.map(v => convert(v))
  } else if (utils.isPlainObject(value)) {
    utils.forOwn(value, (v,k) => {
      if (DISTANCE_KEYS.includes(k))
        v = Math.floor(convertUnit(v).from("mi").to("km"))
      value[k] = convert(v)
    })
    return value
  } else {
    return value
  }
}

