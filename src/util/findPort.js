'use strict'

// adapted from https://github.com/indexzero/node-portfinder

const net = require('net')

const findPort = (port, cb) => {
  const server = net.createServer(() => {})

  const onListen = () => {
    server.removeListener('error', onError)
    server.close()
    cb(null, port)
  }

  const onError = err => {
    server.removeListener('listening', onListen)
    if (err.code !== 'EADDRINUSE' && err.code !== 'EACCES') {
      return cb(err)
    }
    findPort(port + 1, cb)
  }
  server.once('error', onError)
  server.once('listening', onListen)
  server.listen(port)
}

module.exports = findPort
