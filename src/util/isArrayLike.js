'use strict'

const isNumber = require('./isNumber')

function isArrayLike(arg){
  return arg && isNumber(arg.length)
}

module.exports = isArrayLike

