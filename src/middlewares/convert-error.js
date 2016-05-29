import {newError} from "../errors"

export var convertError = [null,
  function error(err) {
    if (!(err instanceof Error))
      err = newError({status: err.status, body: err.data})
    return Promise.reject(err)
  }
]
