"use strict";

const docs = 'https://zaphod.surge.sh/api';

function type(any) {
  const str = Object.prototype.toString.call(any);
  return str.slice(8, -1);
}

function copy(object) {
  const keys = Object.keys(object);
  const clone = object instanceof Array ? [] : {};
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    clone[key] = object[key];
  }
  return clone;
}

export function set(key, value) {
  if(this == undefined) {
    return { [key]: value };
  }

  // cheap return if key is already set
  if(this[key] === value) {
    return this;
  }

  const clone = copy(this);
  clone[key] = value;
  return clone;
}

export function setIn(keys, value) {
  if(!(keys instanceof Array)) {
    throw new TypeError(`setIn expected first argument to be an Array of keys. Not a ${type(keys)}! ${docs}/setIn`);
  }

  if(keys.length === 0) {
    return this;
  }

  const isNil = this == undefined;
  const clone = isNil ? {} : copy(this);

  let ref = clone;
  let index = 0;

  while(index < (keys.length - 1)) {
    const key = keys[index];

    // make sure we create the path if needed
    if(ref[key] == undefined) {
      const nextKey = keys[index + 1];
      ref[key] = typeof nextKey === 'number' ? [] : {};
    } else {
      ref[key] = copy(ref[key]);
    }

    ref = ref[key]
    index += 1
  }

  ref[keys[index]] = value;

  return clone;
}

export function unset(key) {
  if(this == undefined) {
    return {};
  }

  // forgiving return for removing missing key
  if(!this.hasOwnProperty(key)) {
    return this;
  }

  const clone = copy(this);
  delete clone[key];
  return clone;
}

export function get(key, notFound) {
  if(this == undefined) {
    return notFound;
  }

  if(this[key] !== undefined) {
    return this[key];
  } else {
    return notFound;
  }
}

export function getIn(keys, notFound) {
  if(!(keys instanceof Array)) {
    throw new TypeError(`getIn expected first argument to be an Array of keys. Not a ${type(keys)}! ${docs}/getIn`)
  }

  if(keys.length === 0) {
    return notFound;
  }

  if(this == undefined) {
    return notFound;
  }

  let ref = this;
  let index = 0

  while(index < keys.length) {
    const key = keys[index]

    if(ref[key] == undefined) {
      return notFound;
    } else {
      ref = ref[key];
    }

    index += 1
  }

  return ref;
}

export function update(key, func, ...args) {
  const clone = copy(this);
  const val = clone[key];

  if(func == undefined) {
    clone[key] = undefined;
  } else {
    clone[key] = func(val, ...args);
  }

  return clone;
}

export function updateIn(keys, func, ...args) {
  if(!(keys instanceof Array)) {
    throw new TypeError(`updateIn expected first argument to be an Array of keys. Not a ${type(keys)}! ${docs}/updateIn`);
  }

  const current = this::getIn(keys);
  const updated =
    (func == undefined)
      ? undefined
      : func(current, ...args);

  return this::setIn(keys, updated);
}

export function merge(...objects) {
  if(objects.length === 0) {
    return this;
  }

  // filter out falsy values
  const values = objects.filter(object => object);

  return Object.assign({}, this, ...values);
}

export function keys() {
  if(this == undefined) {
    return [];
  }

  return Object.keys(this);
}

export function vals() {
  if(this == undefined) {
    return [];
  }

  // cheap return if getting vals of an array
  if(this instanceof Array) {
    return this;
  }

  const ks = Object.keys(this);
  const vs = new Array(ks.length);
  for(let i = 0; i < ks.length; i++) {
    vs[i] = this[ks[i]];
  }

  return vs;
}

export function size() {
  if(this instanceof Array) {
    return this.length;
  }

  if(typeof this === 'string') {
    return this.length;
  }

  // forgive calls for null/undefined
  if(this == undefined) {
    return 0;
  }

  return this::keys().length;
}

export function equals(val) {
  if(this === val) {
    return true;
  }

  if(typeof this !== typeof val) {
    return false;
  }

  if(typeof this === 'number') {
    return isNaN(this) && isNaN(val);
  }

  if(this instanceof Date && val instanceof Date) {
    return this.getTime() === val.getTime();
  }

  if(this instanceof RegExp && val instanceof RegExp) {
    return this.toString() === val.toString();
  }

  const ownKeys = keys(this);
  const altKeys = keys(val);
  if(ownKeys.length !== altKeys.length) {
    return false;
  }

  for(let i = 0; i < ownKeys.length; i++) {
    const key = ownKeys[i];
    if(!equals(this[key], val[key])) {
      return false;
    }
  }

  return true;
}

export function isEmpty() {
  return this::size() === 0;
}

export function first() {
  return this[0];
}

export function rest() {
  if(this == undefined) {
    return [];
  }

  if(!(this instanceof Array)) {
    throw new TypeError(`rest can only be called on an Array. Not on a ${type(this)}! ${docs}/rest`);
  }

  return this.slice(1);
}

export function take(n) {
  if(this == undefined) {
    return [];
  }

  if(!(this instanceof Array)) {
    throw new TypeError(`take can only be called on an Array. Not on a ${type(this)}! ${docs}/take`);
  }

  if(typeof n !== 'number') {
    throw new TypeError(`take expected first argument to be the Number of items to take. Not a ${type(n)}! ${docs}/take`);
  }

  return this.slice(0, n);
}

export function takeWhile(func) {
  if(this == undefined) {
    return [];
  }

  if(!(this instanceof Array)) {
    throw new TypeError(`takeWhile can only be called on an Array. Not on a ${type(this)}! ${docs}/takeWhile`);
  }

  if(typeof func !== 'function') {
    throw new TypeError(`takeWhile expected first argument to be a predicate Function. Not a ${type(func)}! ${docs}/takeWhile`);
  }

  let index = 0;
  while(func(this[index]) && index < this.length) {
    index += 1;
  }

  return this.slice(0, index);
}

export function drop(n) {
  if(this == undefined) {
    return [];
  }

  if(!(this instanceof Array)) {
    throw new TypeError(`drop can only be called on an Array. Not on a ${type(this)}! ${docs}/drop`);
  }

  if(typeof n !== 'number') {
    throw new TypeError(`drop expected first argument to be the Number of items to drop. Not a ${type(n)}! ${docs}/drop`);
  }

  return this.slice(n);
}

export function dropWhile(func) {
  if(this == undefined) {
    return [];
  }

  if(!(this instanceof Array)) {
    throw new TypeError(`dropWhile can only be called on an Array. Not on a ${type(this)}! ${docs}/dropWhile`);
  }

  if(typeof func !== 'function') {
    throw new TypeError(`dropWhile expected first argument to be a predicate Function. Not a ${type(func)}! ${docs}/dropWhile`);
  }

  let index = 0;

  while(func(this[index]) && index < this.length) {
    index += 1;
  }

  return this.slice(index);
}

export function flatten() {
  // forgive calls on empty values
  if(this == undefined) {
    return [];
  }

  if(!(this instanceof Array)) {
    throw new TypeError(`flatten can only be called on arrays. Not a ${type(this)}! ${docs}/flatten`);
  }

  const stack = [this];
  const flat = [];

  while(stack.length > 0) {
    const item = stack.pop();

    if(item instanceof Array) {
      for(let i = 0; i < item.length; i++) {
        stack.push(item[i]);
      }
    } else {
      flat.unshift(item);
    }
  }

  return flat;
}

export function distinct() {
  if(this == undefined) {
    return [];
  }

  if(!(this instanceof Array)) {
    throw new TypeError(`distinct can only be called on arrays. Not a ${type(this)}! ${docs}/distinct`);
  }

  const unique = [];

  for(let i = 0; i < this.length; i++) {
    if(unique.indexOf(this[i]) < 0) {
      unique.push(this[i]);
    }
  }

  return unique;
}


export function groupBy(func) {
  const grouped = {};

  for(let i = 0; i < this.length; i++) {
    const key = func(this[i]);
    grouped[key] = grouped[key] || [];
    grouped[key].push(this[i]);
  }

  return grouped;
}

export function interpose(separator) {
  const interposed = [];
  for(let i = 0; i < this.length; i++) {
    interposed.push(this[i], separator);
  }

  // remove final separator
  return interposed.slice(0, -1);
}

export function push(...items) {
  if(!(this instanceof Array)) {
    throw new TypeError(`push can only be called on arrays. Not a ${type(this)}! ${docs}/push`);
  }

  if(items.length === 0) {
    return this;
  }

  return this.concat(items);
}

export function peek() {
  if(this.length) {
    return this[this.length - 1];
  } else {
    return undefined;
  }
}

export function pop() {
  if(this == undefined) {
    return undefined;
  }

  if(!(this instanceof Array)) {
    throw new TypeError(`pop can only be called on arrays. Not a ${type(this)}! ${docs}/pop`);
  }

  return this.slice(0, -1);
}

export function reverse() {
  if(this == undefined) {
    return [];
  }

  if(!(this instanceof Array)) {
    throw new TypeError(`reverse can only be called on arrays. Not a ${type(this)}! ${docs}/reverse`);
  }

  return copy(this).reverse();
}

export function sort(func) {
  if(this == undefined) {
    return [];
  }

  if(!(this instanceof Array)) {
    throw new TypeError(`sort can only be called on arrays. Not a ${type(this)}! ${docs}/sort`);
  }

  return copy(this).sort(func);
}

export function zip(values) {
  if(this == undefined || values == undefined) {
    return {};
  }

  const zipped = {};

  for(let i = 0; i < this.length; i++) {
    const key = this[i];
    const val = values[i];
    if(val != undefined) {
      zipped[key] = val;
    }
  }

  return zipped;
}

export function constantly(any) {
  return function constant() {
    return any;
  };
}

export function identity(any) {
  return any;
}

export function inc(n) {
  return n + 1;
}

export function dec(n) {
  return n - 1;
}

export function range(end) {
  const nums = [];

  if(end > 0) {
    for(let i = 0; i < end; i++) {
      nums.push(i);
    }
  } else {
    for(let i = 0; i > end; i--) {
      nums.push(i);
    }
  }

  return nums;
}

export function repeat(n, any) {
  if(typeof n !== 'number') {
    throw new TypeError(`repeat expected first argument to be the Number of times to repeat the value. Not a ${type(n)}! ${docs}/repeat`);
  }

  const list = [];

  // prevent infinite loops
  if(n < 0) return [];

  for(let i = 0; i < n; i++) {
    list[i] = any;
  }

  return list;
}

export function repeatedly(n, func) {
  if(typeof n !== 'number') {
    throw new TypeError(`repeatedly expected first argument to be the Number of times to call the func. Not a ${type(n)}! ${docs}/repeatedly`);
  }

  const list = [];

  // prevent infinite loops
  if(n < 0) return [];

  for(let i = 0; i < n; i++) {
    list[i] = func();
  }

  return list;
}

export function transient(func) {
  const clone = copy(this);

  // do side effects
  func(clone);

  return clone;
}

