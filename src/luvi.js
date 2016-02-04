'use strict'

var http        = require('http')
  , opener      = require('opener')
  , connect     = require('connect')
  , serveStatic = require('serve-static')
  , mix         = require('./util/mix')
  , each        = require('./util/each')
  , proxy       = require('./util/proxy')
  , beacon      = require('./util/beacon')

var logger = function(serverName, middlewareName){
  return console.log.bind(console, serverName, middlewareName + ':')
}

var defaults = {
    root     : process.cwd()
  , port     : 4444
  , name     : 'luvi'
  , onListen : function(serverName, port){
      console.log(serverName, 'is listening on', port)
      opener('http://localhost:' + port)
  }
}

var luvi = function(options){
  var config = mix(defaults, options)
    , app    = connect()

  if(config.proxy){
    each(config.proxy, function(target, context){
      app.use(context, proxy(target, {
        context : context
      , log     : logger(config.name, 'proxy')
      }))
    })
  }

  app.use(serveStatic(config.root))

  beacon(config.port, function(err, port){
    if(err){
      throw err
    }
    http.createServer(app).listen(port, function(){
      config.onListen(config.name, port)
    })
  })
}

module.exports = luvi

