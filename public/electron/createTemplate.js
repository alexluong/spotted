const { BrowserWindow, app } = require("electron")
const settings = require("electron-settings")

const colorTheme = settings.get("colorTheme")

module.exports = function createTemplate(mainWindow, actions) {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Open File",
          click: () => {
            actions.openFile()
          },
        },
        {
          label: "Open Folder",
          accelerator: "CmdOrCtrl+O",
          click: () => {
            actions.openDir()
          },
        },
        { type: "separator" },
        {
          label: "Save File",
          accelerator: "CmdOrCtrl+S",
          click: () => {
            mainWindow.webContents.send("save-file")
          },
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        {
          label: "Light mode",
          type: "radio",
          checked: colorTheme === "light",
          click: () => {
            mainWindow.webContents.send("switch-color-theme", "light")
          },
        },
        {
          label: "Dark mode",
          type: "radio",
          checked: colorTheme === "dark",
          click: () => {
            mainWindow.webContents.send("switch-color-theme", "dark")
          },
        },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Analysis",
      submenu: [
        {
          label: "Text",
          accelerator: "CmdOrCtrl+Shift+A",
          click: () => {
            mainWindow.webContents.send("analyze", "text")
          },
        },
        {
          label: "Readability",
          click: () => {
            mainWindow.webContents.send("analyze", "readability")
          },
        },
      ],
    },
    {
      role: "window",
      submenu: [{ role: "minimize" }, { role: "close" }],
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: () => {
            require("electron").shell.openExternal("https://electronjs.org")
          },
        },
      ],
    },
    {
      label: "Developer",
      submenu: [
        {
          label: "Toggle Developer Tools",
          accelerator:
            process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
          click: () => {
            mainWindow.webContents.toggleDevTools()
          },
        },
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+Shift+R",
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              // on reload, start fresh and close any old
              // open secondary windows
              if (focusedWindow.id === 1) {
                BrowserWindow.getAllWindows().forEach(win => {
                  if (win.id > 1) win.close()
                })
              }
              focusedWindow.reload()
            }
          },
        },
      ],
    },
  ]

  // If macOS
  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services", submenu: [] },
        { type: "separator" },
        { role: "hide" },
        { role: "hideothers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    })

    // Edit menu
    template[2].submenu.push(
      { type: "separator" },
      {
        label: "Speech",
        submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
      },
    )

    // Window menu
    template[5].submenu = [
      { role: "close" },
      { role: "minimize" },
      { role: "zoom" },
      { type: "separator" },
      { role: "front" },
    ]
  }

  return template
}
