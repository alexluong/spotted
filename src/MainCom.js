import React from "react"
import App from "./App"

const { ipcRenderer } = window.require("electron")
const settings = window.require("electron-settings")

class MainCom extends React.Component {
  constructor(props) {
    super(props)

    this.app = React.createRef()
  }

  componentDidMount() {
    ipcRenderer.on("new-dir", this.onNewDir)
    ipcRenderer.on("save-file", this.onSaveFile)
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("new-dir", this.onNewDir)
    ipcRenderer.removeListener("save-file", this.onSaveFile)
  }

  onNewDir = (e, directory) => {
    this.app.setState({ directory })
    settings.set("directory", directory)
    this.app.readAndLoadFilesInDirectory(directory)
  }

  onSaveFile = () => {
    this.app.saveFile()
  }

  render() {
    return <App ref={instance => (this.app = instance)} />
  }
}

export default MainCom
