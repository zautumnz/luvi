'use strict'

const
  http        = require('http')
, opener      = require('opener')
, connect     = require('connect')
, serveStatic = require('serve-static')
, mix         = require('./util/mix')
, each        = require('./util/each')
, beacon      = require('./util/beacon')
, notFound    = require('./util/notFound')

const defaults = {
  root     : process.cwd()
, port     : 4444
, name     : 'luvi'
, onListen(name, port){
    console.log(name, 'is listening on', port)
    opener('http://localhost:' + port)
  }
}

const luvi = options => {
  let
    config = mix(defaults, options)
  , app    = connect()

  app.use(serveStatic(config.root))

  if (config.notFound) {
    app.use(notFound(config.notFound))
  }

  beacon(config.port, (err, port) => {
    if(err){
      throw err
    }
    http.createServer(app).listen(port, () => {
      config.onListen(config.name, port)
    })
  })
}

module.exports = luvi
