'use strict'

var isNumber = require('./isNumber')
  , isArrayLike = function(arg){
    return arg && isNumber(arg.length)
}

module.exports = isArrayLike
