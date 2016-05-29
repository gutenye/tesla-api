import Debug from "debug"

export function cdebug(format, ...args) { Debug("tesla-api")(`%s ${format}`, new Date().toLocaleTimeString(), ...args) }
export var clog = console.log.bind(console)
export var cerror = console.log.bind(console)
