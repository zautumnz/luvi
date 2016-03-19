'use strict'

const each = require('./each')

function mix(){
  let mixed = {}
  each(arguments, (obj) => {
    each(obj, (item, index) => {
      mixed[index] = item
    })
  })
  return mixed
}

module.exports = mix

