'use strict'

// from https://github.com/indexzero/node-portfinder

const net = require('net')

function beacon(port, fn){
  let server = net.createServer(function(){})

  function onListen(){
    server.removeListener('error', onError)
    server.close()
    fn(null, port)
  }

  function onError(err){
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

