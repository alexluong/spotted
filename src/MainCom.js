import React from "react"
import PropTypes from "prop-types"
import App from "./App"

const { ipcRenderer } = window.require("electron")
const settings = window.require("electron-settings")

class MainCom extends React.Component {
  static propTypes = {
    switchColorTheme: PropTypes.func.isRequired,
  }

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
    this.props.switchColorTheme(colorTheme)
  }

  render() {
    return <App ref={instance => (this.app = instance)} />
  }
}

export default MainCom
