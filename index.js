#!/usr/bin/env node

'use strict'

const
  minimist    = require('minimist')
, luvi        = require('./luvi')
, help        = require('./help')
, mix         = require('./lib/mix')
, each        = require('./lib/each')
, clrs        = require('./lib/color')
, filter      = require('./lib/filter')
, readJSON    = require('./lib/readJSON')
, isArrayLike = require('./lib/isArrayLike')
, pkg         = readJSON(__dirname, 'package.json')
, argv        = minimist(process.argv.slice(2))
, l           = console.log
, configFile  = argv.config || `.${pkg.name}.json`
, config      = readJSON(configFile)
, version     = `❤ luvi ${pkg.version}`
let servers   = isArrayLike(config) ? config : [config]

if (argv.v)       {argv.version = argv.v}
if (argv.h)       {argv.help    = argv.h}
if (argv.r)       {argv.root    = argv.r}
if (argv.p)       {argv.port    = argv.p}
if (argv.version) {return l(clrs.yellow(version))}
if (argv.help)    {return l(clrs.cyan(help))}

if (argv._.length) {
  servers = filter(servers, item =>
    item && argv._.indexOf(item.name) >= 0
  )
}

each(servers, server => {
  luvi(mix(server, argv))
})
