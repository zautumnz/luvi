'use strict'

// from https://github.com/indexzero/node-portfinder

const
  net    = require('net')
, beacon = (port, fn) => {
  var server   = net.createServer(() => {})
  var onListen = () => {
    server.removeListener('error', onError)
    server.close()
    fn(null, port)
  }
  var onError = (err) => {
    server.removeListener('listening', onListen)
    if(err.code !== 'EADDRINUSE' && err.code !== 'EACCES'){
      return fn(err)
    }
    beacon(port + 1, fn)
  }
  server.once('error', onError)
  server.once('listening', onListen)
  server.listen(port)
}

module.exports = beacon
