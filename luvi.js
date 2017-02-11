'use strict'

const
  z           = require('zeelib').default
, http        = require('http')
, connect     = require('connect')
, serveStatic = require('serve-static')
, notFound    = require('./lib/notFound')
, { colorize, mix, open, findPort } = z
, clrs = colorize

const defaults = {
  root     : process.cwd()
, port     : 4444
, name     : 'luvi'
, onListen (name, port, shouldOpen) {
    console.log(clrs.magenta(`♡ ${name} is listening on ${port}`))
    shouldOpen && open(`http://127.0.0.1:${port}`)
  }
}

const luvi = (options) => {
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
