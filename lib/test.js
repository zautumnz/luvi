const
  test             = require('tape')
// , { createServer } = require('net')
, readFile         = require('./readFile')
, readJSON         = require('./readJSON')
// , notFound         = require('./notFound')

test('readFile', (t) => {
  t.plan(2)
  t.is(readFile('./lib/dummy'), 'asdfghjkl;\n', 'returns file')
  t.is(readFile('./asdf'), undefined, 'returns undefined for invalid file')
})

test('readJSON', (t) => {
  t.plan(2)
  t.deepEqual(readJSON('./lib/dummy.json'), { foo: 'bar' }, 'returns file')
  t.is(readJSON('./asdf'), undefined, 'returns undefined for invalid file')
})

// open
// process.platform === 'linux'
// process.platform === 'darwin'
// process.platform === 'win32'
