'use strict'

const each = require('./each')

var mix = () => {
  var mixed = {}
  each(arguments, (obj) => {
    each(obj, (item, index) => {
      mixed[index] = item
    })
  })
  return mixed
}

module.exports = mix
