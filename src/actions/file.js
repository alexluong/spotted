const fs = window.require("fs")

const fileActions = {}

fileActions.readFilesInDirectory = function(directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, async (error, files) => {
      if (error) {
        reject(error)
      }

      const promiseArr = files
        .filter(file => file.substring(file.lastIndexOf(".")) === ".md")
        .map(file => readFileStats(file, directory))

      const filesData = await Promise.all(promiseArr)
      filesData.sort(
        (a, b) => b.lastModified.getTime() - a.lastModified.getTime(),
      )

      resolve(filesData)
    })
  })
}

function readFileStats(file, directory) {
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

fileActions.readFile = function(path) {
  return fs.readFileSync(path).toString()
}

fileActions.saveFile = function(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, error => {
      if (error) {
        reject(error)
      }

      resolve()
    })
  })
}

fileActions.getFileStats = function(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, stats) => {
      if (error) {
        reject(error)
      }

      resolve(stats)
    })
  })
}

export default fileActions
