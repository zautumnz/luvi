#!/usr/bin/env node

const minimist = require('minimist')
const luvi = require('./lib/luvi')
const help = require('./lib/help')
const clrs = require('./lib/colors')
const pkg = require('./package.json')
const argv = minimist(process.argv.slice(2))
const l = console.log
const version = `♡ luvi ${pkg.version}`

const nope = () => {
  l(`
  Please require('luvi'), not ('luvi/index')
  `)
  process.exit(1)
}

const main = () => {
  if (argv.v) { argv.version = argv.v }
  if (argv.h) { argv.help = argv.h }
  if (argv.r) { argv.root = argv.r }
  if (argv.p) { argv.port = argv.p }
  if (argv.o) { argv.open = argv.o }
  if (argv.version) { return l(clrs.yellow(version)) }
  if (argv.help) { return l(clrs.cyan(help)) }

  luvi(argv)
}

if (require.main === module) {
  main()
} else {
  nope()
}
