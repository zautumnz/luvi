'use strict'

const
  fs       = require('fs')
, path     = require('path')

function readFile(){
  let file = path.resolve.apply(null, arguments)
  try {
    return fs.readFileSync(file, {encoding : 'utf8'})
  } catch(e) {
    return
  }
}

module.exports = readFile
