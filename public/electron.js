// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, shell } = require("electron")
const isDev = require("electron-is-dev")
const path = require("path")

const createActions = require("./electron/createActions")
const createTemplate = require("./electron/createTemplate")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    titleBarStyle: "hidden",
  })

  // and load create-react-app port.
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`,
  )

  // Create menu
  const actions = createActions(mainWindow)
  const template = createTemplate(mainWindow, actions)
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // In the app (renderer) when the user click on a link
  // We will open the link in a browser window
  mainWindow.webContents.on("will-navigate", (e, url) => {
    if (url != mainWindow.webContents.getURL()) {
      e.preventDefault()
      shell.openExternal(url)
    }
  })

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
