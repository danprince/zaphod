import test from 'tape';
import {
  set, setIn, remove, get, getIn, update, updateIn, merge,
  keys, vals, size, equals, push, first, rest, flatten, distinct,
  dropWhile, drop, groupBy, interpose, isEmpty, peek, pop,
  reverse, sort, take, takeWhile, zip, constantly, identity,
  inc, dec, range, repeat, repeatedly, transient
} from './';

test('set', (assert) => {
  assert.plan(6);

  assert.deepEqual(
    ({ damogran: 5 })::set('zaphod', 'beeblebrox'),
    { damogran: 5, zaphod: 'beeblebrox' },
    'should setiate a new key/value in an object'
  );

  assert.deepEqual(
    ({ damogran: 4 })::set('damogran', 5),
    { damogran: 5 },
    'should overwrite existing key'
  );

  const computer = { deep: 'thought' };
  assert.is(
    computer::set(),
    computer,
    'should return original object for no-arg calls'
  );

  assert.is(
    computer::set('deep', 'thought'),
    computer,
    'should return original object when key/value will not change'
  );

  const arthur = { name: 'dent' };
  assert.not(
    arthur::set('age', 34),
    arthur,
    'should not mutate original object'
  );

  assert.deepEqual(
    [42, 42, 42]::set(0, 5),
    [5, 42, 42],
    'should work with arrays too'
  );
});

test('setIn', (assert) => {
  assert.plan(8);

  assert.throws(
    () => ({})::setIn(2),
    TypeError,
    'should throw for non-array path'
  );

  assert.deepEquals(
    ({ trisha: { mc: 'millan' }})::setIn(['trisha', 'mc'], 4),
    ({ trisha: { mc: 4 }}),
    'should update nested property'
  );

  assert.deepEqual(
    [1, [2], 3]::setIn([1, 0], 'a'),
    [1, ['a'], 3],
    'should work with arrays'
  );

  const earth = { harmless: true };
  assert.not(
    earth::setIn(['harmless'], 'mostly'),
    earth,
    'should not mutate original reference'
  );

  assert.is(
    earth::setIn([]),
    earth,
    'should return original reference for empty key array'
  );

  assert.deepEquals(
    ({})::setIn(['guide', 'to', 'the'], 'galaxy'),
    ({ guide: { to: { the: 'galaxy' }}}),
    'should create the path if its not there'
  );

  assert.deepEquals(
    undefined::setIn(['guide', 'to', 'the'], 'galaxy'),
    ({ guide: { to: { the: 'galaxy' }}}),
    'should create whole path if called on undefined'
  );

  assert.deepEquals(
    null::setIn(['guide', 'to', 'the'], 'galaxy'),
    ({ guide: { to: { the: 'galaxy' }}}),
    'should create whole path if called on null'
  );
});

test('remove', (assert) => {
  assert.plan(5);

  const jeltz = { vogon: 'captain' };
  assert.is(
    jeltz::remove(),
    jeltz,
    'should return original object for prank calls'
  );

  assert.is(
    jeltz::remove('poetry'),
    jeltz,
    'should return original object when key does not exist'
  );

  assert.deepEqual(
    ({ damogran: 5, zaphod: 'beeb' })::remove('zaphod'),
    { damogran: 5 },
    'should remove a key from an object'
  );

  const arthur = { name: 'dent' };
  assert.not(
    arthur::remove('name'),
    arthur,
    'should not mutate original object'
  );

  assert.not(
    ['pan', 'galactic', 'gargle', 'blaster']::remove(0),
    [ , 'galactic', 'gargle', 'blaster'],
    'should work with arrays too'
  );
});

test('get', (assert) => {
  assert.plan(8);

  assert.is(
    ({ paranoid: 'android' })::get('paranoid'),
    'android',
    'should return the value for the key'
  );

  assert.is(
    ['life', 'universe', 'everything']::get(0),
    'life',
    'should also work with arrays'
  );

  assert.is(
    'zaphod'::get(0),
    'z',
    'should also work with strings'
  );

  assert.is(
    ({})::get('jeltz', 4),
    4,
    'should return notFound value for missing key'
  );

  assert.is(
    ({ jeltz: undefined })::get('jeltz', 4),
    4,
    'should return notFound value for undefined keys'
  );

  const marvin = Object.create({ type: 'android' });
  assert.is(
    marvin::get('type'),
    'android',
    'should work for properties on the protoype chain'
  );

  assert.is(
    undefined::get('meaning', 42),
    42,
    'should return notFound when called on undefined'
  );

  assert.is(
    null::get('meaning', 42),
    42,
    'should return notFound when called on null'
  );
});

test('getIn', (assert) => {
  assert.plan(9);

  assert.throws(
    () => ({})::getIn(2),
    TypeError,
    'should throw for non-array keys'
  );

  assert.is(
    ({ bee: { ble: 'brox' } })::getIn(['bee', 'ble']),
    'brox',
    'should get nested key'
  );

  assert.is(
    ({ bee: ['ble', 'brox'] })::getIn(['bee', 1, 2]),
    'o',
    'should work in mixed type collections'
  );

  assert.is(
    ({ beeble: 'brox' })::getIn(['bobble'], 'brix'),
    'brix',
    'should use notFound if top-level key does not exist'
  );

  assert.is(
    ({ bee: { ble: 'brox' } })::getIn(['bee', 'bee'], 'zaphod'),
    'zaphod',
    'should use notFound if nested key does not exist'
  );

  assert.is(
    ({ beeble: undefined })::getIn(['beeble'], 'betelgeuse'),
    'betelgeuse',
    'should use notFound if value is undefined'
  );

  assert.is(
    ({ beeble: undefined })::getIn([], 'betelgeuse'),
    'betelgeuse',
    'should use notFound if passed empty array of keys'
  );

  assert.is(
    undefined::getIn(['meaning'], 42),
    42,
    'should return notFound when called on undefined'
  );

  assert.is(
    null::getIn(['meaning'], 42),
    42,
    'should return notFound when called on null'
  );
});

test('update', (assert) => {
  assert.plan(2);

  const inc = n => n + 1;

  assert.deepEquals(
    ({ life: 41 })::update('life', inc),
    ({ life: 42 }),
    'should apply func to value at key'
  );

  const add = (a, b) => a + b;

  assert.deepEquals(
    ({ life: 2 })::update('life', add, 40),
    ({ life: 42 }),
    'should apply with any additional arguments'
  );
});

test('updateIn', (assert) => {
  assert.plan(4);

  assert.throws(
    () => ({})::updateIn(2),
    TypeError,
    'should throw for non-array path'
  );

  const inc = n => n + 1;

  assert.deepEquals(
    ({ a: { b: 3 }})::updateIn(['a', 'b'], inc),
    ({ a: { b: 4 }}),
    'should apply func to nested value'
  );

  assert.deepEquals(
    ({})::updateIn(['a', 'b'], () => 3),
    ({ a: { b: 3 }}),
    'should create path if it not there'
  );

  const add = (a, b) => a + b;

  assert.deepEquals(
    ({ state: { count: 2 } })::updateIn(['state', 'count'], add, 40),
    ({ state: { count: 42 } }),
    'should apply with any additional arguments'
  );
});

test('merge', (assert) => {
  assert.plan(3);

  assert.deepEquals(
    ({ a: 1 })::merge({ b: 2 }, { c: 3 }),
    ({ a: 1, b: 2, c: 3 }),
    'should merge together multiple objects'
  );

  const foo = { a: 1 };
  assert.not(
    foo::merge({ b: 2 }),
    foo,
    'should not mutate original reference'
  );

  assert.deepEquals(
    ({ a: 1 })::merge(null, { b: 2 }, undefined),
    ({ a: 1, b: 2 }),
    'should silently ignore falsy values'
  );
});

test('keys', (assert) => {
  assert.plan(5);

  assert.deepEquals(
    ({ arthur: 'd', ford: 'p', zaphod: 'b' })::keys(),
    ['arthur', 'ford', 'zaphod'],
    'should return keys for an object'
  );

  assert.deepEquals(
    ['arthur', 'ford', 'zaphod']::keys(),
    ['0', '1', '2'],
    'should return indices for an array'
  );

  assert.deepEquals(
    'zaphod'::keys(),
    ['0', '1', '2', '3', '4', '5'],
    'should work with strings'
  );

  assert.deepEquals(
    null::keys(),
    [],
    'should return empty array for null'
  );

  assert.deepEquals(
    undefined::keys(),
    [],
    'should return empty array for undefined'
  );
});

test('vals', (assert) => {
  assert.plan(5);

  assert.deepEquals(
    ({ arthur: 'd', ford: 'p', zaphod: 'b' })::vals(),
    ['d', 'p', 'b'],
    'should return vals for an object'
  );

  const xs = ['trillian', 'marvin', 'eddie'];
  assert.is(
    xs::vals(),
    xs,
    'should return original reference for an array'
  );

  assert.deepEquals(
    'zaphod'::vals(),
    ['z', 'a', 'p', 'h', 'o', 'd'],
    'should work with strings'
  );

  assert.deepEquals(
    null::vals(),
    [],
    'should return empty array for null'
  );

  assert.deepEquals(
    undefined::vals(),
    [],
    'should return empty array for undefined'
  );
});

test('size', (assert) => {
  assert.plan(6);

  assert.is(
    ['ursa', 'minor', 'beta']::size(),
    3,
    'should get size from array types'
  );

  assert.is(
    null::size(),
    0,
    'should treat null as an empty object'
  );

  assert.is(
    undefined::size(),
    0,
    'should treat undefined as an empty object'
  );

  assert.is(
    ({ name: 'Trillian' })::size(),
    1,
    'should get key count from objects'
  );

  assert.is(
    'megadodo'::size(),
    8,
    'should work with strings'
  );

  assert.is(
    ({ length: 6 })::size(),
    1,
    'should not be tripped up by array-likes'
  );
});

test('equals', (assert) => {
  assert.plan(13);

  assert.ok(
    (2)::equals(2),
    'should find equality between primitives'
  );

  assert.notOk(
    (2)::equals(3),
    'should not find equality between different primitives'
  );

  assert.notOk(
    (2)::equals('2'),
    'should only use strict equality'
  );

  assert.notOk(
    (false)::equals(0),
    'should not find disparate falsy types to be equal'
  );

  assert.notOk(
    (true)::equals(1),
    'should not find disparate truthy types to be equal'
  );

  assert.ok(
    ({ a: 1, b: 2 })::equals({ a: 1, b: 2 }),
    'should find equality between objects'
  );

  assert.ok(
    ([1, 2, 3])::equals([1, 2, 3]),
    'should find equality between arrays'
  );

  const d1 = new Date('Sat Aug 13 2016 09:01:14 GMT+0100 (BST)');
  const d2 = new Date(1471075274000);
  const d3 = new Date();

  assert.ok(
    d1::equals(d2),
    'should find equality between dates'
  );

  assert.notOk(
    d1::equals(d3),
    'should not find false positives with dates'
  );

  assert.ok(
    /hello/::equals(/hello/),
    'should find equality between regexes'
  );

  assert.notOk(
    /hello/::equals(/hollo/),
    'should not find equality between false regexes'
  );

  assert.ok(
    (NaN)::equals(NaN),
    'should find equality between NaNs'
  );

  assert.ok(
    ({ a: { b: [d1, NaN, true] } })::equals({ a: { b: [d1, NaN, true] } }),
    'should find equality between deep structures'
  );
});

test('push', (assert) => {
  assert.plan(4);

  assert.throws(
    () => false::push(3),
    TypeError,
    'should throw when called on non-array type'
  );

  assert.deepEquals(
    [1, 2]::push(3),
    [1, 2, 3],
    'should be able to push onto end of array'
  );

  assert.deepEquals(
    [1]::push(2, 3),
    [1, 2, 3],
    'should be able to push multiple values'
  );

  const xs = [1, 2, 3];
  assert.not(
    xs::push(4),
    xs,
    'should not mutate reference'
  );
});

test('first', (assert) => {
  assert.plan(3);

  assert.is(
    [1, 2, 3]::first(),
    1,
    'should get first item from array'
  );

  assert.is(
    ({ 0: 1, 1: 2, 2: 3 })::first(),
    1,
    'should work with array-likes'
  );

  assert.is(
    []::first(),
    undefined,
    'should return undefined for empty list'
  );
});

test('rest', (assert) => {
  assert.plan(4);

  assert.throws(
    () => false::rest(),
    TypeError,
    'should throw when called on non-array type'
  );

  assert.deepEquals(
    [1, 2, 3]::rest(),
    [2, 3],
    'should get subsequent items from array'
  );

  assert.deepEquals(
    []::rest(),
    [],
    'should return empty list for empty list'
  );

  assert.deepEquals(
    [1]::rest(),
    [],
    'should return empty list for one element list'
  );
});

test('flatten', (assert) => {
  assert.plan(6);

  assert.deepEquals(
    [1, 2, 3, 4]::flatten(),
    [1, 2, 3, 4],
    'should not affect flat lists'
  );

  assert.deepEquals(
    [1, [2, 3], 4]::flatten(),
    [1, 2, 3, 4],
    'should flatten nested vectors in order'
  );

  assert.deepEquals(
    [1, [[2], [[3], 4]]]::flatten(),
    [1, 2, 3, 4],
    'should flatten deep nested vectors in order'
  );

  assert.deepEqual(
    null::flatten(),
    [],
    'should return empty array when flattening null'
  );

  assert.deepEqual(
    undefined::flatten(),
    [],
    'should return empty array when flattening undefined'
  );

  assert.throws(
    () => ({ })::flatten(),
    TypeError,
    'should throw on attempt to flatten non-array'
  );
});

test('distinct', (assert) => {
  assert.plan(1);

  assert.deepEquals(
    [1, 2, 2, 3, 4]::distinct(),
    [1, 2, 3, 4],
    'should remove all duplicate values'
  );
});

test('dropWhile', (assert) => {
  assert.plan(3);

  const odd = n => (n % 2 !== 0);

  assert.deepEquals(
    [1, 3, 5, 6]::dropWhile(odd),
    [6],
    'should drop predicated values'
  );

  assert.deepEquals(
    []::dropWhile(odd),
    [],
    'should return empty array for dropWhile on empty array'
  );

  assert.deepEquals(
    [1, 2, 3, 4, 5, 6]::dropWhile(n => n < 10),
    [],
    'should not continue indefinitely'
  );
});

test('drop', (assert) => {
  assert.plan(2);

  assert.deepEquals(
    [1, 2, 3]::drop(2),
    [3],
    'should drop items from the start of the array'
  );

  assert.deepEquals(
    []::drop(5),
    [],
    'should return empty array for drop on empty array'
  );
});

test('groupBy', (assert) => {
  assert.plan(1);

  assert.deepEquals(
    ['arthur', 'ford', 'zaphod', 'trillian']::groupBy(str => str[0]),
    { a: ['arthur'], f: ['ford'], z: ['zaphod'], t: ['trillian'] },
    'should group items by a given key'
  );
});

test('interpose', (assert) => {
  assert.plan(2);

  assert.deepEquals(
    [1, 2, 3]::interpose(0),
    [1, 0, 2, 0, 3],
    'should interpose separator between vals in coll'
  );

  assert.deepEquals(
    [1]::interpose(0),
    [1],
    'should have no effect on length 1 arrays'
  );
});

test('isEmpty', (assert) => {
  assert.plan(7);

  assert.ok(
    []::isEmpty(),
    'should recognize empty array as empty'
  );

  assert.notOk(
    [1, 2]::isEmpty(),
    'should not recognize filled array as empty'
  );

  assert.ok(
    ({})::isEmpty(),
    'should recognize empty object as empty'
  );

  assert.notOk(
    ({ a: 1 })::isEmpty(),
    'should not recognize keyed object as empty'
  );

  assert.ok(
    ''::isEmpty(),
    'should recognize empty string as empty'
  );

  assert.notOk(
    'viscinity'::isEmpty(),
    'should not recognize filled string as empty'
  );

  assert.notOk(
    ({ length: 3 })::isEmpty(),
    'should not be tricked by array-likes'
  );
});

test('peek', (assert) => {
  assert.plan(3);

  assert.is(
    [1, 2, 3]::peek(),
    3,
    'should return final array element'
  );

  assert.is(
    []::peek(),
    undefined,
    'should return undefined for empty array'
  );

  assert.is(
    [1]::peek(),
    1,
    'should return only element for 1-length array'
  );
});

test('pop', (assert) => {
  assert.plan(2);

  assert.deepEquals(
    [1, 2, 3]::pop(),
    [1, 2],
    'should remove final element from array'
  );

  const xs = [1, 2, 3];
  assert.not(
    xs::pop(),
    xs,
    'should not mutate original array'
  );
});

test('reverse', (assert) => {
  assert.plan(2);

  assert.deepEquals(
    [1, 2, 3]::reverse(),
    [3, 2, 1],
    'should reverse array'
  );

  const xs = [1, 2, 3];
  assert.not(
    xs::reverse(),
    xs,
    'should not mutate original array'
  );
});

test('sort', (assert) => {
  assert.plan(3);

  assert.deepEquals(
    [3, 2, 1]::sort(),
    [1, 2, 3],
    'should sort array'
  );

  const xs = [2, 1, 3];
  assert.not(
    xs::sort(),
    xs,
    'should not mutate original array'
  );

  assert.deepEquals(
    [1, 2, 3]::sort((a, b) => b - a),
    [3, 2, 1],
    'should allow custom compare function'
  );
});

test('take', (assert) => {
  assert.plan(2);

  assert.deepEquals(
    [1, 2, 3]::take(1),
    [1],
    'should take items from start of array'
  );

  assert.deepEquals(
    []::take(2),
    [],
    'should return empty array when taking from empty array'
  );
});

test('takeWhile', (assert) => {
  assert.plan(3);

  const odd = n => (n % 2 !== 0);

  assert.deepEquals(
    [1, 3, 5, 6]::takeWhile(odd),
    [1, 3, 5],
    'should take predicated values'
  );

  assert.deepEquals(
    []::takeWhile(odd),
    [],
    'should return empty array for takeWhile on empty array'
  );

  assert.deepEquals(
    [1, 2, 3, 4, 5, 6]::takeWhile(n => n < 10),
    [1, 2, 3, 4, 5, 6],
    'should not continue indefinitely'
  );
});

test('zip', (assert) => {
  assert.plan(4);

  const ks = ['a', 'b', 'c'];
  const vs = [1, 2, 3];

  assert.deepEqual(
    ks::zip(vs),
    { a: 1, b: 2, c: 3 },
    'should zip together keys and values'
  );

  assert.deepEqual(
    ['a', 'b', 'c']::zip([1, 2, 3, 4]),
    { a: 1, b: 2, c: 3 },
    'should ignore values without keys'
  );

  assert.deepEqual(
    ['a', 'b']::zip([1, 2, 3]),
    { a: 1, b: 2 },
    'should ignore keys without values'
  );

  assert.deepEqual(
    ['a', 'b']::zip([undefined, 2, 3]),
    { b: 2 },
    'should ignore keys with undefined values'
  );
});

test('constantly', (assert) => {
  assert.plan(3);

  const make5 = constantly(5);
  assert.deepEqual(
    [make5(), make5(), make5()],
    [5, 5, 5],
    'should always return initial value'
  );

  assert.is(
    make5.call({ v: 5 }),
    5,
    'should ignore calling context'
  );

  const foo = { };
  assert.is(
    constantly(foo)(),
    foo,
    'should return original reference'
  );
});

test('identity', (assert) => {
  assert.plan(1);

  assert.is(
    identity(5),
    5,
    'should return first argument'
  );
});

test('inc', (assert) => {
  assert.plan(1);

  assert.is(
    inc(3),
    4,
    'should increment a number'
  );
});

test('dec', (assert) => {
  assert.plan(1);

  assert.is(
    dec(3),
    2,
    'should decrement a number'
  );
});

test('range', (assert) => {
  assert.plan(2);

  assert.deepEqual(
    range(5),
    [0, 1, 2, 3, 4],
    'should work with positive end index'
  );

  assert.deepEqual(
    range(-4),
    [0, -1, -2, -3],
    'should work with negative end index'
  );
});

test('repeat', (assert) => {
  assert.plan(2);

  assert.deepEqual(
    repeat(4, 10),
    [10, 10, 10, 10],
    'should repeat value n times'
  );

  assert.deepEqual(
    repeat(-3, null),
    [],
    'should return empty array for n < 0'
  );
});

test('repeatedly', (assert) => {
  assert.plan(2);

  let i = 0;
  const count = () => i += 1;

  assert.deepEqual(
    repeatedly(5, count),
    [1, 2, 3, 4, 5],
    'should call func n times'
  );

  assert.deepEqual(
    repeatedly(-3, count),
    [],
    'should return empty array for n < 0'
  );
});

test('transient', (assert) => {
  assert.plan(2);

  const marvin = { paranoid: true };

  assert.deepEquals(
    marvin::transient(android => {
      android.paranoid = false;
    }),
    { paranoid: false },
    'should allow for managed mutations'
  );

  assert.not(
    marvin::transient(android => {
      android.paranoid = false;
    }),
    marvin,
    'should not mutate original reference'
  );
});

