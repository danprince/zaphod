---
layout: default.html
title: Cheatsheet
---

# Cheatsheet
This document is designed to help programmers coming from JavaScript navigate their way through Zaphod's API.

## Tour
Zaphod's functions can be grouped into three categories.

### Keyed Collections
These functions work with objects and arrays.

[`set`](/api/set)
[`setIn`](/api/setIn)
[`getIn`](/api/getIn)
[`update`](/api/update)
[`updateIn`](/api/updateIn)
[`merge`](/api/merge)
[`keys`](/api/keys)
[`vals`](/api/vals)
[`size`](/api/size)
[`equals`](/api/equals)
[`transient`](/api/transient)

---

### Indexed Collections
These functions only work with arrays.

[`first`](/api/first)
[`rest`](/api/rest)
[`take`](/api/take)
[`takeWhile`](/api/takeWhile)
[`drop`](/api/drop)
[`dropWhile`](/api/dropWhile)
[`flatten`](/api/flatten)
[`distinct`](/api/distinct)
[`groupBy`](/api/groupBy)
[`interleave`](/api/interleave)
[`interpose`](/api/interpose)
[`isEmpty`](/api/isEmpty)
[`push`](/api/push)
[`peek`](/api/peek)
[`pop`](/api/pop)
[`reverse`](/api/reverse)
[`sort`](/api/sort)
[`zip`](/api/zip)

---

### Functional Utilities
These functions are just functional utilities. 

[`constantly`](/api/constantly)
[`identity`](/api/identity)
[`inc`](/api/inc)
[`dec`](/api/dec)
[`range`](/api/range)
[`repeat`](/api/repeat)
[`repeatedly`](/api/repeatedly)

---

## Common Tasks

| Task | Mutable | Immutable |
| ---- | ------- | --------- |
| Setting a property | `obj.a = 3` | [`obj::set('a', 3)`](/api/set) |
| Removing a property | `delete obj.a` | [`obj::remove('a')`](/api/remove) |
| Getting a property | `obj.a` | [`obj::get('a')`](/api/get) |
| Merging objects | `Object.assign(obj, src)` | [`obj::merge(src)`](/api/merge) |
| Pushing items onto an array | `arr.push(1, 2)` | [`arr::push(1, 2)`](/api/push) |
| Remove item from end of array | `arr.pop()` | [`arr::pop()`](/api/pop) |
| Reversing an array | `arr.reverse()` | [`arr::reverse()`](/api/reverse) |
| Sorting an array | `arr.sort()` | [`arr::sort()`](/api/sort) |

---

### Setting a Property
With mutable collections its possible to use syntactic operators to assign or re-assign the properties.

```js
obj.a = 3;
obj['a'] = 3;
```

The [`set`](/api/set) function will return a new collection with the value for a single property updated.

```js
obj::set('a', 3);
```

---

### Deleting a Property
It's possible to use the `delete` keyword to remove a property from a mutable collection.

```js
delete obj.a;
delete obj['a'];
```

The [`remove`](/api/remove) function will return a new collection with the property removed.

```js
obj::remove('a');
```

---

### Merging Objects
The `Object.assign` function mutates one collection by merging the others into it.

```js
Object.assign({}, { a: 1 }, { b: 2 });
```

The [`merge`](/api/merge) function will always merge the collections into a new one.

```js
({ a: 1 })::merge({ b: 2 });
```

---

### Pushing
The `.push` method mutates an array by adding new items to the end of it. Then it returns the new array length.

```js
[1, 2, 3].push(4);
```

The [`push`](/api/push) function returns a new array with the items pushoined onto the end.

```js
[1, 2, 3]::push(4)
```

---

### Popping
The `.pop` method mutates an array by removing the final item, then returning the popped item.

```js
[1, 2, 3].pop()
```

The [`pop`](/api/pop) _function_ returns a new array with the final item removed.

```js
[1, 2, 3]::pop()
```

---

### Sorting
The `.sort` method mutates the array by sorting it in place.

```js
[2, 1, 3].sort()
```

The [`sort`](/api/sort) _function_ returns a new sorted copy of the array.

```js
[2, 1, 3]::sort()
```

---

### Reversing
The `.reverse` method mutates the array by reversing it in place.

```js
[3, 2, 1].reverse()
```

The [`reverse`](/api/reverse) _function_ returns a new reversed copy of the array.

```js
[3, 2, 1]::reverse()
```

