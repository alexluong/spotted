import React from "react"
import { css } from "react-emotion"
import showdown from "showdown"
// import YoastSEO from "yoastseo" // Need to change in node_modules (temp fix)
import SplitPane from "react-split-pane"
// components
import Header from "components/Header"
import Greeting from "components/Greeting"
import FilesWindow from "components/FilesWindow"
import EditorWindow from "components/EditorWindow"
import MarkdownWindow from "components/MarkdownWindow"
// styles
import resetStyle from "./styles/resetStyle"
import setSplitPaneStyle from "./styles/setSplitPaneStyle"

import fileActions from "actions/file"

const settings = window.require("electron-settings")

// const Researcher = YoastSEO.Researcher
// const Paper = YoastSEO.Paper

resetStyle()
setSplitPaneStyle()

const Converter = new showdown.Converter({ table: true })
const convertMarkdownToHTML = markdown => Converter.makeHtml(markdown)

class App extends React.Component {
  state = {
    markdown: "",
    html: "",
    filesData: [],
    activeIndex: 0,
    directory: settings.get("directory") || "",
  }

  componentDidMount() {
    const { directory } = this.state
    if (directory) {
      this.readAndLoadFilesInDirectory(directory)
    }
  }

  setStateWithHTML(state) {
    this.setState({
      ...state,
      html: convertMarkdownToHTML(state.markdown),
    })
  }

  readAndLoadFilesInDirectory = async directory => {
    const filesData = await fileActions.readFilesInDirectory(directory)
    this.setState({ filesData }, () => {
      if (filesData.length > 0) {
        this.loadCurrentFileData(0)
      }
    })
  }

  loadCurrentFileData(index) {
    const { filesData } = this.state
    const content = fileActions.readFile(filesData[index].path)
    this.setStateWithHTML({
      markdown: content,
      activeIndex: index,
    })
  }

  saveFile = async () => {
    const { markdown, activeIndex, filesData } = this.state
    await fileActions.saveFile(filesData[activeIndex].path, markdown)
  }

  createFile = async name => {
    const { directory, filesData } = this.state
    const path = `${directory}/${name}.md`

    try {
      await fileActions.saveFile(path, "")
      const stats = await fileActions.getFileStats(path)

      filesData.unshift({
        name: `${name}.md`,
        path,
        lastModified: stats.mtime,
      })

      this.setStateWithHTML({
        filesData,
        activeIndex: 0,
        markdown: "",
      })
    } catch (error) {
      console.error(error)
    }
  }

  changeActiveFile = incomingIndex => () => {
    if (incomingIndex !== this.state.activeIndex) {
      this.saveFile()
      this.loadCurrentFileData(incomingIndex)
    }
  }

  render() {
    const { markdown, html, directory, filesData, activeIndex } = this.state

    // const researcher = new Researcher(new Paper(html))
    // console.log({
    //   loadedFile,
    //   yoast: researcher.getResearch("wordCountInText"),
    // })

    return (
      <React.Fragment>
        <Header
          headerContent={`Spotted - ${directory.substring(
            directory.lastIndexOf("/") + 1,
          )}${filesData[activeIndex] ? `/${filesData[activeIndex].name}` : ""}`}
        />

        {directory ? (
          <SplitPane split="vertical" defaultSize="20%" className={splitCss}>
            <FilesWindow
              addNewFile={this.createFile}
              filesData={filesData}
              activeIndex={activeIndex}
              changeActiveFile={this.changeActiveFile}
            />

            <SplitPane split="vertical" defaultSize="50%">
              <EditorWindow
                value={markdown}
                onEditorChange={newContent =>
                  this.setStateWithHTML({ markdown: newContent })
                }
              />

              <MarkdownWindow content={html} />
            </SplitPane>
          </SplitPane>
        ) : (
          <Greeting />
        )}
      </React.Fragment>
    )
  }
}

export default App

const splitCss = css`
  display: flex;
  height: 100vh;
  margin-top: 23px;
  overflow: hidden;
`
