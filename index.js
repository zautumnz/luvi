#!/usr/bin/env node

'use strict'

const minimist = require('minimist')
const luvi = require('./luvi')
const help = require('./help')
const readJSON = require('./lib/readJSON')
const pkg = readJSON(__dirname, 'package.json')
const argv = minimist(process.argv.slice(2))
const l = console.log
const configFile = argv.config || `.${pkg.name}.json`
const config = readJSON(configFile)
const version = `♡ luvi ${pkg.version}`
const { each, mix, colorize, filter, isArrayLike } = require('zeelib')
const clrs = colorize

let servers = isArrayLike(config)
  ? config
  : [ config ]

if (argv.v)       { argv.version = argv.v }
if (argv.h)       { argv.help    = argv.h }
if (argv.r)       { argv.root    = argv.r }
if (argv.p)       { argv.port    = argv.p }
if (argv.n)       { argv.noOpen  = argv.n }
if (argv.version) { return l(clrs.yellow(version)) }
if (argv.help)    { return l(clrs.cyan(help)) }

if (argv._.length) {
  servers = filter(servers, (item) =>
    item && argv._.indexOf(item.name) >= 0
  )
}

each(servers, (server) => {
  luvi(mix(server, argv))
})
