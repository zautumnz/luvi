'use strict'

const
  path          = require('path')
, readFile      = require('./readFile')
, stripComments = require('strip-json-comments')

function readJSON(){
  let
    file    = path.resolve.apply(null, arguments)
  , content = readFile(file)
  if(!content){
    return
  }
  try {
    return JSON.parse(stripComments(content))
  } catch(e){
    return console.error('error parsing JSON:', file)
  }
}

module.exports = readJSON

