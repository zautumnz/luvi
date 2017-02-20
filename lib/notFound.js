'use strict'

const { createReadStream } = require('fs')
const { resolve } = require('path')

const notFound = (config) => {
  const
    status   = 404
  , filePath = config

  return (req, res) => {
    res.writeHead(status, { 'Content-Type' : 'text/html' })
    createReadStream(resolve(filePath)).pipe(res)
  }
}

module.exports = notFound
