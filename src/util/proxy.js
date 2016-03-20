// Use `secure: false` in the proxy configuration to access HTTPS targets without cert
// Rewrite request Host header by using the proxy target
// Use `headers: { host: <new host> }` in proxy configuration to rewrite the
// `Host` header with the current proxy target

'use strict'

const
  httpProxy     = require('http-proxy')
, url           = require('url')
, cookieRewrite = require('./cookieRewrite')

function proxyUtil(target, options){
  target  = url.parse(target)
  options = options || {}

  let log = options.log || console.log

  let host = url.format({
    protocol : target.protocol
  , host     : target.host
  })

  let path = target.pathname || ''
  if (path === '/') {
    path = ''
  }

  let proxy = httpProxy.createProxyServer({
    target  : host
  , secure  : false
  , headers : {host : target.host}
  })

  proxy.on('error', (err, req, res) => {
    let msg = err.toString() + ': ' + host + req.url
    log(msg)
    res.writeHead(500, {'Content-Type': 'text/plain'})
    res.end(msg)
  })

  proxy.on('proxyRes', (proxyRes, req, res) => {
    log(req.method, req.url.replace(path, ''), host + req.url, proxyRes.statusCode)
    let headers = proxyRes.headers
    if (!headers['set-cookie']) {
      return
    }

    headers['set-cookie'] = headers['set-cookie'].map(cookie => {
      return cookieRewrite(cookie, (cookie) => {
        if (cookie.path) {
          cookie.path = cookie.path.replace(path, '')
        }
        return cookie
      })
    })
  })

  return (req, res) => {
    req.url = path + req.url.replace(/^[/][?]/, '?').replace(/^[/]$/, '')
    proxy.web(req, res)
  }
}

module.exports = proxyUtil
