import React from "react"
import ReactDOM from "react-dom"
import MainCom from "./MainCom"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(<MainCom />, document.getElementById("root"))
registerServiceWorker()
