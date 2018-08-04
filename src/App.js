import React from "react"
import { css } from "react-emotion"
import SplitPane from "react-split-pane"
// components
import FilesWindow from "components/FilesWindow"
import EditorWindow from "components/EditorWindow"
import MarkdownWindow from "components/MarkdownWindow"
// styles
import resetStyle from "./styles/resetStyle"
import setSplitPaneStyle from "./styles/setSplitPaneStyle"

const fs = window.require("fs")
const settings = window.require("electron-settings")
const { ipcRenderer } = window.require("electron")

resetStyle()
setSplitPaneStyle()

class App extends React.Component {
  state = {
    loadedFile: "",
    filesData: [],
    activeIndex: 0,
    directory: settings.get("directory") || "",
  }

  componentDidMount() {
    ipcRenderer.on("new-file", this.onNewFile)
    ipcRenderer.on("new-dir", this.onNewDir)
    ipcRenderer.on("save-file", this.saveFile)

    const { directory } = this.state
    if (directory) {
      this.loadAndReadFiles(directory)
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("new-file", this.onNewFile)
    ipcRenderer.removeListener("new-dir", this.onNewDir)
    ipcRenderer.removeListener("save-file", this.saveFile)
  }

  onNewFile = (e, fileContent) => {
    this.setState({ loadedFile: fileContent })
  }

  onNewDir = (e, directory) => {
    this.setState({ directory })
    settings.set("directory", directory)
    this.loadAndReadFiles(directory)
  }

  loadAndReadFiles(directory) {
    fs.readdir(directory, async (error, files) => {
      const promiseArr = files
        .filter(file => file.substring(file.lastIndexOf(".")) === ".md")
        .map(file => this.getFile(file, directory))

      const filesData = await Promise.all(promiseArr)
      filesData.sort(
        (a, b) => b.lastModified.getTime() - a.lastModified.getTime(),
      )

      this.setState({ filesData }, () => this.loadFile(0))
    })
  }

  getFile(file, directory) {
    return new Promise(resolve => {
      const path = `${directory}/${file}`

      fs.stat(path, (error, stats) => {
        resolve({
          name: file,
          path,
          lastModified: stats.mtime,
        })
      })
    })
  }

  loadFile(index) {
    const { filesData } = this.state
    const content = fs.readFileSync(filesData[index].path).toString()
    this.setState({
      loadedFile: content,
      activeIndex: index,
    })
  }

  saveFile = () => {
    const { activeIndex, loadedFile, filesData } = this.state

    fs.writeFile(filesData[activeIndex].path, loadedFile, error => {
      if (error) {
        console.error(error)
      }
    })
  }

  changeFile = incomingIndex => () => {
    const { activeIndex } = this.state

    if (incomingIndex !== activeIndex) {
      this.saveFile()
      this.loadFile(incomingIndex)
    }
  }

  newFile(newEntryName) {
    const { directory, filesData } = this.state
    const path = `${directory}/${newEntryName}.md`

    fs.writeFile(path, "", error => {
      if (error) {
        console.error(error)
        return
      }

      fs.stat(path, (error, stats) => {
        filesData.unshift({
          name: `${newEntryName}.md`,
          path,
          lastModified: stats.mtime,
        })

        this.setState({
          filesData,
          activeIndex: 0,
          loadedFile: "",
        })
      })
    })
  }

  render() {
    const { loadedFile, directory, filesData, activeIndex } = this.state

    return (
      <React.Fragment>
        <header className={headerCss}>Spotted</header>

        {directory ? (
          <SplitPane split="vertical" defaultSize="20%" className={splitCss}>
            <FilesWindow
              addNewFile={this.newFile}
              filesData={filesData}
              activeIndex={activeIndex}
              changeActiveFile={this.changeFile}
            />

            <SplitPane split="vertical" defaultSize="50%">
              <EditorWindow
                value={loadedFile}
                onEditorChange={newContent =>
                  this.setState({ loadedFile: newContent })
                }
              />

              <MarkdownWindow content={loadedFile} />
            </SplitPane>
          </SplitPane>
        ) : (
          <div className={loadingCss}>
            <h1>Press Cmd + O to open directory</h1>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default App

const headerCss = css`
  background-color: #191324;
  color: #75717c;
  font-size: 1.4rem;
  height: 23px;
  line-height: 23px;
  text-align: center;
  position: fixed;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  -webkit-app-region: drag;
`

const loadingCss = css`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #191324;

  h1 {
    font-size: 2.4rem;
  }
`

const splitCss = css`
  display: flex;
  height: 100vh;
  margin-top: 23px;
  overflow: hidden;
`
