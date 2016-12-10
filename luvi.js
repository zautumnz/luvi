'use strict'

const
  http        = require('http')
, connect     = require('connect')
, serveStatic = require('serve-static')
, mix         = require('./lib/mix')
, open        = require('./lib/open')
, clrs        = require('./lib/color')
, findPort    = require('./lib/findPort')
, notFound    = require('./lib/notFound')

const defaults = {
  root     : process.cwd()
, port     : 4444
, name     : 'luvi'
, onListen (name, port, shouldOpen) {
    console.log(clrs.magenta(`❣ ${name} is listening on ${port}`))
    shouldOpen && open(`http://127.0.0.1:${port}`)
  }
}

const luvi = options => {
  const
    config     = mix(defaults, options)
  , app        = connect()
  , shouldOpen = !options.noOpen

  app.use(serveStatic(config.root))

  if (config.notFound) {
    app.use(notFound(config.notFound))
  }

  findPort(config.port, (err, port) => {
    if (err) {
      throw err
    }
    http.createServer(app).listen(port, () => {
      config.onListen(config.name, port, shouldOpen)
    })
  })
}

module.exports = luvi
