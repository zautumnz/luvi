'use strict'

const
  path          = require('path')
, readFile      = require('./readFile')

function readJSON(){
  let
    file    = path.resolve.apply(null, arguments)
  , content = readFile(file)
  if (!content) {
    return
  }
  try {
    return JSON.parse(content)
  } catch(e) {
    return console.error('error parsing JSON:', file)
  }
}

module.exports = readJSON

