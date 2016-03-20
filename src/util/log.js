'use strict'

const
  chalk  = require('chalk')
, moment = require('moment')

function log(serverName, middlewareName, method, from, to, status){
  let color = chalk.green
  if (arguments.length === 3) {
    console.log(chalk.red(a), hour(moment().format('H:mm:ss')), chalk.red(method))
    return
  }
  if (status >= 400) {
    color = chalk.red
  }
  console.log('%s %s' + chalk.grey.bold(' %s ') + color('[%s] ') + chalk.yellow('%s -> %s ') + color('[%d]'),
    serverName, middlewareName, moment().format('H:mm:ss'), method, from, to, status)
}

module.exports = log
