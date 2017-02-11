#!/usr/bin/env node

'use strict'

const
  z           = require('zeelib').default
, minimist    = require('minimist')
, luvi        = require('./luvi')
, help        = require('./help')
, readJSON    = require('./lib/readJSON')
, pkg         = readJSON(__dirname, 'package.json')
, argv        = minimist(process.argv.slice(2))
, l           = console.log
, configFile  = argv.config || `.${pkg.name}.json`
, config      = readJSON(configFile)
, version     = `♡ luvi ${pkg.version}`
, { each, mix, colorize, filter, isArrayLike } = z
, clrs = colorize

let servers   = isArrayLike(config) ? config : [config]

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
