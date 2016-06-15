'use strict'

const isNumber = require('./isNumber')

const isArrayLike = arg => arg && isNumber(arg.length)

module.exports = isArrayLike
