const { readFileSync } = require('fs')
const { resolve } = require('path')

function readFile () {
  const file = resolve.apply(null, arguments)
  try {
    return readFileSync(file, { encoding: 'utf8' })
  } catch (e) {
    return
  }
}

module.exports = readFile
