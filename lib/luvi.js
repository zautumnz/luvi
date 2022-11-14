const http = require('http')

const connect = require('connect')
const serveStatic = require('serve-static')
const open = require('open')

const clrs = require('./colors')
const findPort = require('./find-port')
const markdown = require('./markdown')
const notFound = require('./not-found')

const defaults = {
  root: process.cwd(),
  port: 4444,
  name: 'luvi',
  async onListen (name, port, shouldOpen) {
    console.log(clrs.magenta(`♡ ${name} is listening on ${port}`))
    shouldOpen && await open(`http://localhost:${port}`)
  }
}

const luvi = (options) => {
  const config = Object.assign({}, defaults, options)
  const app = connect()
  const shouldOpen = !options.noOpen

  app.use(
    serveStatic(config.root, {
      index: ['index.html', 'index.htm', 'index.xhtml']
    })
  )

  if (config.notFound) {
    app.use(notFound(config.notFound))
  }

  if (config.markdown) {
    app.use(markdown(config.root))
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
