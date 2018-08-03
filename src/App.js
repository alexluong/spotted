import React from "react"
import styled, { css } from "react-emotion"
import Markdown from "markdown-to-jsx"
import AceEditor from "react-ace"
import dateFns from "date-fns"
// styles
import resetStyle from "./resetStyle"
import setEditorStyle from "./editorStyle"
import "brace/mode/markdown"
import "brace/theme/dracula"

const fs = window.require("fs")
const settings = window.require("electron-settings")
const { ipcRenderer } = window.require("electron")

resetStyle()
setEditorStyle()

class App extends React.Component {
  state = {
    loadedFile: "",
    filesData: [],
    activeIndex: 0,
    newEntry: false,
    newEntryName: "",
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

  newFile = e => {
    e.preventDefault()

    const { directory, newEntryName, filesData } = this.state
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
          newEntry: false,
          newEntryName: "",
          filesData,
          activeIndex: 0,
          loadedFile: "",
        })
      })
    })
  }

  toggleNewEntry = () => {
    this.setState(prevState => ({
      newEntry: !prevState.newEntry,
    }))
  }

  render() {
    const {
      loadedFile,
      directory,
      filesData,
      activeIndex,
      newEntry,
      newEntryName,
    } = this.state

    return (
      <React.Fragment>
        <header className={headerCss}>Peanet</header>

        {directory ? (
          <div className={splitCss}>
            <div className={filesWindowCss}>
              <button className={buttonCss} onClick={this.toggleNewEntry}>
                + New Entry
              </button>

              {newEntry && (
                <form onSubmit={this.newFile}>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Title"
                    value={newEntryName}
                    onChange={e => {
                      this.setState({ newEntryName: e.target.value })
                    }}
                    onBlur={this.toggleNewEntry}
                    className={inputCss}
                  />
                </form>
              )}

              <div className={filesContainerCss}>
                {newEntry && <div className={overlayCss} />}

                {filesData.map((file, i) => (
                  <FileButton
                    key={i}
                    active={i === activeIndex}
                    onClick={this.changeFile(i)}
                  >
                    <p className="title">{file.name}</p>
                    <p className="date">{formatDate(file.lastModified)}</p>
                  </FileButton>
                ))}
              </div>
            </div>

            <div className={codeWindowCss}>
              <AceEditor
                mode="markdown"
                theme="dracula"
                onChange={newContent =>
                  this.setState({ loadedFile: newContent })
                }
                name="markdown_editor"
                value={loadedFile}
                showGutter={false}
                showPrintMargin={false}
              />
            </div>

            <div className={markdownWindowCss}>
              <Markdown>{loadedFile}</Markdown>
            </div>
          </div>
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
`

const filesWindowCss = css`
  background-color: #140f1d;
  border-right: 1px solid #302b3a;
  position: relative;
  width: 20%;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: -10px 0 20px rgba(0, 0, 0, 0.3) inset;
  }
`

const codeWindowCss = css`
  flex: 1;
  padding-top: 2rem;
  background-color: #191324;
`

const markdownWindowCss = css`
  background-color: #191324;
  width: 35%;
  padding: 2rem;
  color: #fff;
  border-left: 1px solid #302b3a;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #82d8d8;
  }

  h1 {
    border-bottom: 3px solid #e54b4b;
    padding-bottom: 1rem;
  }

  a {
    color: #e54b4b;
  }
`

const activeButtonCss = css`
  opacity: 1;
  border-left: 4px solid #82d8d8;
`

const FileButton = styled.button`
  padding: 1rem;
  width: 100%;
  background-color: #191324;
  opacity: 0.4;
  color: #fff;
  text-align: left;
  border: none;
  border-bottom: 1px solid #302b3a;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ active }) => active && activeButtonCss};

  &:hover {
    ${activeButtonCss};
  }

  &:active,
  &:focus {
    outline: none;
  }

  .title {
    font-weight: 800;
    font-size: 1.4rem;
    margin: 0 0 5px 0;
  }

  .date {
    margin: 0;
    font-size: 1.2rem;
  }
`

const buttonCss = css`
  display: block;
  background-color: transparent;
  color: #fff;
  border: 1px solid #82d8d8;
  border-radius: 4px;
  margin: 1rem auto;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #82d8d8;
    color: #191324;
  }
`

const inputCss = css`
  display: block;
  max-width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #191324;
  color: #fff;

  &:focus {
    outline: none;
  }
`

const filesContainerCss = css`
  position: relative;
`

const overlayCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`

const formatDate = date => dateFns.format(date, "MMMM Do YYYY")
