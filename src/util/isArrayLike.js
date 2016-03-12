'use strict'

const isNumber = require('./isNumber')

var isArrayLike = (arg) => {
  return arg && isNumber(arg.length)
}

module.exports = isArrayLike
