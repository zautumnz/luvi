'use strict'

const
  isArrayLike = require('./isArrayLike')
, each        = require('./each')

var filter = (list, fn) => {
  var isArr    = isArrayLike(list)
    , filtered = isArr ? [] : {}
  each(list, (item, index) => {
    if(fn(item, index)){
      if(isArr){
        index = filtered.length
      }
      filtered[index] = item
    }
  })
  return filtered
}

module.exports = filter
