const { createServer } = require('net')

const findPort = (port, cb) => {
  const server = createServer(() => {})
  const onListen = () => {
    server.close()
    cb(null, port)
  }

  server.once('error', onError)
  server.once('listening', onListen)
  server.listen(port)

  function onError (err) {
    server.removeListener('listening', onListen)
    if (err.code && ['EADDRINUSE', 'EACCESS'].includes(err.code)) {
      return cb(err)
    }
    findPort(port + 1, cb)
  }
}

module.exports = findPort
