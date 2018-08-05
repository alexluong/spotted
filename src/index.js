import React from "react"
import ReactDOM from "react-dom"
import ErrorBoundary from "./ErrorBoundary"
import MainCom from "./MainCom"

const Root = () => (
  <ErrorBoundary>
    <MainCom />
  </ErrorBoundary>
)

ReactDOM.render(<Root />, document.getElementById("root"))

// FIXME: Remove these some time...
const { warn } = console
console.warn = (...args) => {
  ;/^%cElectron Security Warning/.test(args[0]) ||
    /^Automatically scrolling cursor/.test(args[0]) ||
    Reflect.apply(warn, console, args)
}
