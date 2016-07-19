'use strict'

const
  fs   = require('fs')
, path = require('path')

const notFound = config => {
  const
    status   = 404
  , filePath = config

  return (req, res) => {
    res.writeHead(status, {'Content-Type' : 'text/html'})
    fs.createReadStream(path.resolve(filePath)).pipe(res)
  }
}

module.exports = notFound
