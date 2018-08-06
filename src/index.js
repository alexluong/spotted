import React from "react"
import ReactDOM from "react-dom"
import Setup from "./Setup"

ReactDOM.render(<Setup />, document.getElementById("root"))

// FIXME: Remove these some time...
const { warn } = console
console.warn = (...args) => {
  ;/^%cElectron Security Warning/.test(args[0]) ||
    /^Automatically scrolling cursor/.test(args[0]) ||
    Reflect.apply(warn, console, args)
}
