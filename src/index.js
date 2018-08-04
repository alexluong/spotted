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
