const { resolve } = require('path')
const readFile = require('./read-file')

const readJSON = (...args) => {
  const file = resolve.apply(null, args)
  const content = readFile(file)

  if (!content) {
    return
  }

  try {
    return JSON.parse(content)
  } catch {
    return console.error(`Error parsing JSON: ${file}`)
  }
}

module.exports = readJSON
