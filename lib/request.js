import axios from "axios"
import {API_URL, ANDROID_USER_AGENT} from "./constants"
import {convertUnits, convertToCamelCase, convertError, log} from "./middlewares"

export var request = axios

Object.assign(axios.defaults, {
  baseURL: API_URL,
  headers: {common: {"User-Agent": ANDROID_USER_AGENT}},
})
axios.interceptors.response.use(...log)
axios.interceptors.response.use(...convertUnits)
axios.interceptors.response.use(...convertToCamelCase)
axios.interceptors.response.use(...convertError)
