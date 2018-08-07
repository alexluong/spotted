import React from "react"
import App from "./App"

const { ipcRenderer } = window.require("electron")
const settings = window.require("electron-settings")

class MainCom extends React.Component {
  state = { colorTheme: settings.get("colorTheme") }

  constructor(props) {
    super(props)

    this.app = React.createRef()
  }

  componentDidMount() {
    ipcRenderer.on("new-dir", this.onNewDir)
    ipcRenderer.on("save-file", this.onSaveFile)
    ipcRenderer.on("analyze", this.onAnalyze)
    ipcRenderer.on("switch-color-theme", this.onSwitchColorTheme)
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("new-dir", this.onNewDir)
    ipcRenderer.removeListener("save-file", this.onSaveFile)
    ipcRenderer.removeListener("analyze", this.onAnalyze)
    ipcRenderer.removeListener("switch-color-theme", this.onSwitchColorTheme)
  }

  onNewDir = (e, directory) => {
    this.app.setState({ directory })
    settings.set("directory", directory)
    this.app.readAndLoadFilesInDirectory(directory)
  }

  onSaveFile = () => {
    this.app.saveFile()
  }

  onAnalyze = (e, type) => {
    this.app.analyze(type)
  }

  onSwitchColorTheme = (e, colorTheme) => {
    settings.set("colorTheme", colorTheme)
    this.setState({ colorTheme: colorTheme })
  }

  render() {
    return <App ref={instance => (this.app = instance)} />
  }
}

export default MainCom
