'use strict'

const
  isDefined   = require('./isDefined')
, isArrayLike = require('./isArrayLike')

function iterateArray(arr, fn){
  for(let index = 0, len = arr.length; index < len; index++){
    let exit = fn(arr[index], index)
    if(isDefined(exit)){
      return exit
    }
  }
}

function iterateObject(obj, fn){
  for(let prop in obj){
    let exit = fn(obj[prop], prop)
    if(isDefined(exit)){
      return exit
    }
  }
}

function each(list, fn){
  if(isArrayLike(list)){
    return iterateArray(list, fn)
  }
  return iterateObject(list, fn)
}

module.exports = each

