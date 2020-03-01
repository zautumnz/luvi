const http = require('http')
const connect = require('connect')
const serveStatic = require('serve-static')

const clrs = require('zeelib/lib/colorize').default
const open = require('zeelib/lib/open').default
const findPort = require('zeelib/lib/find-port').default

const notFound = require('./not-found')

const defaults = {
  root: process.cwd(),
  port: 4444,
  name: 'luvi',
  onListen(name, port, shouldOpen) {
    console.log(clrs.magenta(`♡ ${name} is listening on ${port}`))
    shouldOpen && open(`http://127.0.0.1:${port}`)
  },
}

const luvi = (options) => {
  const config = Object.assign({}, defaults, options)
  const app = connect()
  const shouldOpen = !options.noOpen

  app.use(
    serveStatic(config.root, {
      index: ['index.html', 'index.htm', 'index.xhtml'],
    })
  )

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
