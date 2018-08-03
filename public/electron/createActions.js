const fs = require("fs")
const { dialog } = require("electron")

module.exports = function createActions(mainWindow) {
  const actions = {}

  /**
   * Open an individual file
   */
  actions.openFile = function() {
    const files = dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
      filters: [{ name: "Markdown", extensions: ["md"] }],
    })

    if (!files) {
      return
    }

    const file = files[0]
    const fileContent = fs.readFileSync(file).toString()
    mainWindow.webContents.send("new-file", fileContent)
  }

  /**
   * Open a directory
   */
  actions.openDir = function() {
    const directories = dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    })

    if (!directories) {
      return
    }

    const directory = directories[0]
    mainWindow.webContents.send("new-dir", directory)
  }

  return actions
}
