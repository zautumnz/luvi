const
  test        = require('ava')
, util        = require('util')
, isNumber    = require('./isNumber')
, isArrayLike = require('./isArrayLike')
, isDefined   = require('./isDefined')
, mix         = require('./mix')
, color       = require('./color')
, each        = require('./each')
// , findPort    = require('./findPort')
// , readFile    = require('./readFile')
// , notFound    = require('./notFound')
// , open        = require('./open')
// , readJSON    = require('./readJSON')
// , filter      = require('./filter')

// isNumber
test('isNumber returns false for string', t => {
  t.false(isNumber('2'))
})
test('isNumber returns false for object', t => {
  t.false(isNumber({one : 2}))
})
test('isNumber returns false for arr', t => {
  t.false(isNumber([2]))
})
test('isNumber returns true for number', t => {
  t.true(isNumber(2))
})
test('isNumber returns true for float', t => {
  t.true(isNumber(2.22222))
})
test('isNumber returns true for fn that returns number', t => {
  const foo = () => 2
  t.true(isNumber(foo()))
})

// isArrayLike
test('isArrayLike returns false for object', t => {
  t.false(isArrayLike({}))
})
test('isArrayLike returns true for empty array', t => {
  t.true(isArrayLike([]))
})
test('isArrayLike returns true for fn that returns array', t => {
  const foo = () => [0, 1]
  t.true(isArrayLike(foo()))
})

// isDefined
test('isDefined returns false for undefined var', t => {
  let foo
  t.false(isDefined(foo))
})
test('isDefined returns true for defined var', t => {
  const foo = 'foo'
  t.true(isDefined(foo))
})
test('isDefined returns true for fn that returns defined var', t => {
  const foo = () => 'foo'
  t.true(isDefined(foo()))
})

// mix
test('mix mixes two strings into an object', t => {
  const mixed = {'0' : 'g', '1' : 'h', '2' : 'j', '3' : 'k', '4' : 'l'}
  t.deepEqual(mix('asdf', 'ghjkl'), mixed)
})
test('mix mixes two objects', t => {
  const mixed = {a : 'a', b : 'b'}
  t.deepEqual(mix({a : 'a'}, {b : 'b'}), mixed)
})

// color
test('color.blue()', t => {
  const col = util.inspect(color.blue('foo'))
  const str = '\'\\u001b[34mfoo\\u001b[39m\''
  t.is(col, str)
})

// each
test('each returns undefined with nothing passed', t => {
  t.is(each(), undefined)
})
test('each returns first in passed array when passed id fn', t => {
  const a = ['x', 'y', 'z']
  const f = (b) => b
  t.is(each(a, f), 'x')
})
test('each does the same with obj', t => {
  const o = {a : 'a', b : 'b', c : 'c'}
  const f = a => a
  t.is(each(o, f), 'a')
})
