'use strict'

// adapted from gh:domenic/opener
const { platform } = process
const { execFile } = require('child_process')

const open = (args, options, callback) => {
  args = [ args ]
  const cmd = platform === 'win32'
    ? 'cmd'
    : platform === 'darwin'
      ? 'open'
      : 'xdg-open'

  return execFile(cmd, args, options, callback)
}

module.exports = open
