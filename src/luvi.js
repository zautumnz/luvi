'use strict'

const
  http        = require('http')
, opener      = require('opener')
, connect     = require('connect')
, serveStatic = require('serve-static')
, mix         = require('./util/mix')
, log         = require('./util/log')
, each        = require('./util/each')
, proxy       = require('./util/proxy')
, beacon      = require('./util/beacon')
, notFound    = require('./util/notFound')

function logger(serverName, middlewareName){
  return log.bind(log, serverName, middlewareName + ':')
}

const defaults = {
  root     : process.cwd()
, port     : 4444
, name     : 'luvi'
, onListen(serverName, port){
    console.log(serverName, 'is listening on', port)
    opener('http://localhost:' + port)
  }
}

const luvi = function(options){
  let
    config = mix(defaults, options)
  , app    = connect()

  if (config.proxy) {
    each(config.proxy, (target, context) => {
      app.use(context, proxy(target, {
        context : context
      , log     : logger(config.name, 'proxy')
      }))
    })
  }

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
