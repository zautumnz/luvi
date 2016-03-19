'use strict'

// from https://github.com/Scytl/freddie

const
  fs            = require('fs')
, url           = require('url')
, httpProxy     = require('http-proxy')
, cookieRewrite = require('./cookieRewrite')

function proxyMiddleware(target, options){
  options = options || {}

  var
    context   = options.context || ''
  , log       = options.log || console.log
  , isSecured = false
  , urlFormatted

  if (typeof target === 'object') {
    urlFormatted = url.parse(target.url)
    isSecured    = target.hasOwnProperty('cert')
  } else {
    urlFormatted = url.parse(target)
  }

  var proxyTarget = url.format({
    protocol : urlFormatted.protocol
  , host     : urlFormatted.host
  })

  var path = urlFormatted.pathname === '/' ? '' : urlFormatted.pathname
    , proxyContext = path + context

  // `secure:false` in proxy config to access HTTPS targets
  // `headers:{host:<newhost>}` to rewrite host header w/ current proxy target

  var objConf = {
      target  : proxyTarget
    , secure  : false
    , headers : {host: urlFormatted.host}
  }

  if(isSecured){a
    objConf.ssl = {
      key  : fs.readFileSync(target.key, 'utf8')
    , cert : fs.readFileSync(target.cert, 'utf8')
    }
  // objConf.pfx = fs.readFileSync(target.key, 'utf8')
  // objConf.passphrase = "asdfghjkl"
  }

  console.log(objConf)
  var proxy = httpProxy.createProxyServer(objConf)

  proxy.on('error', function(err, req, res){
    var msg = err.toString() + ': ' + proxyTarget + req.url
    log(msg)
    res.writeHead(500, {'Content-Type': 'text/plain'})
    res.end(msg)
  })

  proxy.on('proxyRes', function(proxyRes, req, res){
    var request = req.url.replace(path, '')
      , msg     = request + ' -> ' + proxyTarget + req.url
    log(msg)

    var headers = proxyRes.headers
    if(!headers['set-cookie']){return}

    headers['set-cookie'] = headers['set-cookie'].map(function(cookie){
      return cookieRewrite(cookie, function(cookie){
        if (cookie.path) {cookie.path = cookie.path.replace(path, '')}
        return cookie
      })
    })
  })

  return function(req, res){
    req.url = proxyContext + req.url
    proxy.web(req, res)
  }
}

module.exports = proxyMiddleware

