import {newError} from "../errors"

export var convertError = [null,
  function error(err) {
    if ('status' in err) {
      err = newError(err)
    }
    return Promise.reject(err)
  }
]
