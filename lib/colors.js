const { inspect } = require('util')

const cols = (color, text) => {
  const codes = inspect.colors[color]
  return `\x1b[${codes[0]}m${text}\x1b[${codes[1]}m`
}

const colorize = () => {
  const val = {}
  Object.keys(inspect.colors).forEach((color) => {
    val[color] = (text) => cols(color, text)
  })
  return val
}

module.exports = colorize()
