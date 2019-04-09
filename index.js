#!/usr/bin/env node

const minimist = require('minimist')
const luvi = require('./lib/luvi')
const help = require('./lib/help')
const readJSON = require('./lib/read-json')
const pkg = readJSON(__dirname, 'package.json')
const argv = minimist(process.argv.slice(2))
const l = console.log
const configFile = argv.config || `.${pkg.name}.json`
const config = readJSON(configFile)
const version = `♡ luvi ${pkg.version}`
const each = require('zeelib/lib/each')
const mix = require('zeelib/lib/mix')
const clrs = require('zeelib/lib/colorize')
const filter = require('zeelib/lib/filter')
const isArrayLike = require('zeelib/lib/is-array-like')
const exit = require('zeelib/lib/exit')

let servers = isArrayLike(config)
  ? config
  : [ config ]

const nope = () => {
  l(`
  Please require('luvi'), not ('luvi/index')
  `)
  exit(1)
}

const main = () => {
  if (argv.v) argv.version = argv.v
  if (argv.h) argv.help = argv.h
  if (argv.r) argv.root = argv.r
  if (argv.p) argv.port = argv.p
  if (argv.n) argv.noOpen = argv.n
  if (argv.version) return l(clrs.yellow(version))
  if (argv.help) return l(clrs.cyan(help))

  if (argv._.length) {
    servers = filter(servers, (item) =>
      item && argv._.indexOf(item.name) >= 0
    )
  }

  each(servers, (server) => {
    luvi(mix(server, argv))
  })
}

if (module.parent) nope()
else main()
