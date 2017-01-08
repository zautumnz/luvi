const
  test             = require('tape')
, { inspect }      = require('util')
// , { createServer } = require('net')
, isNumber         = require('./isNumber')
, isArrayLike      = require('./isArrayLike')
, isDefined        = require('./isDefined')
, mix              = require('./mix')
, color            = require('./color')
, each             = require('./each')
, filter           = require('./filter')
, readFile         = require('./readFile')
, readJSON         = require('./readJSON')
// , open             = require('./open')
// , findPort         = require('./findPort')
// , notFound         = require('./notFound')

// isNumber
test('isNumber', (t) => {
  const f = () => 2
  t.plan(6)
  t.false(isNumber('2'), 'returns false for string')
  t.false(isNumber({ one: 2 }), 'returns false for obj')
  t.false(isNumber([2]), 'returns false for arr')
  t.true(isNumber(2), 'returns true for int')
  t.true(isNumber(2.22), 'returns true for float')
  t.true(isNumber(f()), 'returns true for fn that returns number')
})

// isArrayLike
test('isArrayLike', (t) => {
  t.plan(3)
  const foo = () => [ 0, 1 ]
  t.false(isArrayLike({}), 'returns false for obj')
  t.true(isArrayLike([]), 'returns true for empty arr')
  t.true(isArrayLike(foo()), 'returns true for fn that returns arr')
})

// isDefined
test('isDefined', (t) => {
  t.plan(3)
  let un
  const f = () => 'foo'
  const v = 'foo'
  t.false(isDefined(un), 'returns false for undefined var')
  t.true(isDefined(v), 'returns true for defined var')
  t.true(isDefined(f()), 'returns true for fn that returns defined var')
})

// mix
test('mix', (t) => {
  t.plan(2)
  const m1 = { '0' : 'g', '1' : 'h', '2' : 'j', '3' : 'k', '4' : 'l' }
  const m2 = { a : 'a', b : 'b' }
  t.deepEqual(mix('asdf', 'ghjkl'), m1, 'mixes two strings into ojb')
  t.deepEqual(mix({ a : 'a' }, { b : 'b' }), m2, 'mixes two objs')
})

// color
test('color.blue() returns string wrapped in appropriate escape codes', t => {
  t.plan(1)
  const col = inspect(color.blue('foo'))
  const str = '\'\\u001b[34mfoo\\u001b[39m\''
  t.is(col, str)
})

// each
test('each', (t) => {
  t.plan(3)
  const a = ['x', 'y', 'z']
  const o = { a : 'a', b : 'b', c : 'c' }
  const id = (b) => b
  t.is(each(), undefined, 'returns undefined with no args')
  t.is(each(a, id), 'x', 'returns first in passed arr with passed id fn')
  t.is(each(o, id), 'a', 'returns same with obj')
})

// filter
test('filter', (t) => {
  t.plan(2)
  const ar = [ 'a', 'b' ]
  const fn = (a) => a
  t.deepEqual(filter(ar, fn), ar, 'returns arr also passed when passed id fn')
  t.is(typeof filter({}), 'object', 'returns obj when passed obj')
})

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
