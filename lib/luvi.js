const http = require('http')

const connect = require('connect')
const serveStatic = require('serve-static')
const open = require('open')

const clrs = require('./colors')
const markdown = require('./markdown')
const notFound = require('./not-found')

const defaults = {
  root: process.cwd(),
  port: 4444,
  async onListen (port, shouldOpen) {
    console.log(clrs.magenta(`♡ luvi is listening on ${port}`))
    shouldOpen && await open(`http://localhost:${port}`)
  }
}

const luvi = (options) => {
  const config = Object.assign({}, defaults, options)
  const app = connect()
  const shouldOpen = !!config.open

  app.use(
    serveStatic(config.root, {
      index: ['index.html', 'index.htm', 'index.xhtml']
    })
  )

  app.use(notFound())
  app.use(markdown(config.root))

  const s = http.createServer(app)
  s.listen(config.port, () => {
    config.onListen(config.port, shouldOpen)
  })
  return s
}

module.exports = luvi
