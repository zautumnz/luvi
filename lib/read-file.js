const { readFileSync } = require('fs')
const { resolve } = require('path')

const readFile = (...args) => {
  const file = resolve.apply(null, args)
  try {
    return readFileSync(file, { encoding: 'utf8' })
  } catch (e) { }
}

module.exports = readFile
