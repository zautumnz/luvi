'use strict'

const each = require('./each')

function mix () {
  const mixed = {}
  each(arguments, (obj) => {
    each(obj, (item, index) => {
      mixed[index] = item
    })
  })
  return mixed
}

module.exports = mix
