const
  test        = require('ava')
, isNumber    = require('./isNumber')
, isArrayLike = require('./isArrayLike')
, isDefined   = require('./isDefined')

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
