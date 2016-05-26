import utils from "../utils"

export var convertToCamelCase = [
  function success(res) {
    res.data = convert(res.data)
    return res
  }
]

//
// {user_name: 1} -> {userName: 1}
//
// I'm recursive
function convert(value) {
  if (utils.isArray(value)) {
    return value.map(v => convert(v))
  } else if (utils.isPlainObject(value)) {
    return utils.mapOwn(value, (v,k,r) => r[utils.camelCase(k)] = convert(v))
  } else {
    return value
  }
}

