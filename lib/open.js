'use strict'

// adapted from gh:domenic/opener

const c = require('child_process')

const open = (args, options, callback) => {
  args = [args]
  const cmd = process.platform === 'win32'
    ? 'cmd'
    : process.platform === 'darwin'
      ? 'open'
      : 'xdg-open'

  return c.execFile(cmd, args, options, callback)
}

module.exports = open
