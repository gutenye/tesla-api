import {cdebug} from "../console"

export var log = [
  function success(res) {
    cdebug("%s %o", res.config.url, res.data)
    return res
  }, function error(err) {
    if (err.config)
      cdebug("%s %o", err.config.url, err.data)
    return Promise.reject(err)
  },
]
