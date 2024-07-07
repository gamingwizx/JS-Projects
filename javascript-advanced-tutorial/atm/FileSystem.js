const fs = require("fs")

module.exports = class FileSystem {
  static read(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }

  static write(filePath, content) {
    return new Promise(async (resolve, reject) => {
      await fs.writeFile(filePath, content.toString(), (err) => {
        reject(err)
      })
      resolve()
    })
  }
}
