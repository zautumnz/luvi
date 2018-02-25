const { resolve } = require('path')
const readFile = require('./read-file')

function readJSON () {
  const file = resolve.apply(null, arguments)
  const content = readFile(file)

  if (!content) {
    return
  }

  try {
    return JSON.parse(content)
  } catch (e) {
    return console.error(`Error parsing JSON: ${file}`)
  }
}

module.exports = readJSON
